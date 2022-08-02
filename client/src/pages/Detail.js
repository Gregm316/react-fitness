import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_ROUTINE,
  UPDATE_SETS,
  UPDATE_REPS,
  UPDATE_WEIGHT,
  ADD_TO_ROUTINE,
  UPDATE_EXERCISE,
} from '../utils/actions';
import { QUERY_EXERCISE } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import Auth from '../utils/auth';
import { v4 } from "uuid";
import { NotificationContext } from "../Notifications/NotificationProvider";

function Detail() {
  const [state, dispatch] = useStoreContext();
  
  //dispatch notifications on add and delete click
  const dispatchDelete = useContext(NotificationContext);
  const dispatchAdd = useContext(NotificationContext);

  const { id } = useParams();

  const [currentExercise, setCurrentExercise] = useState({});

  const { loading, data } = useQuery(QUERY_EXERCISE);

  const { exercises, cart } = state;

  useEffect(() => {
    if (exercises.length) {
      setCurrentExercise(exercises.find((exercise) => exercise._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_EXERCISE,
        exercises: data.exercises,
      });

      data.exercises.forEach((exercise) => {
        idbPromise('exercises', 'put', exercise);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('exercises', 'get').then((indexedExercises) => {
        dispatch({
          type: UPDATE_EXERCISE,
          exercises: indexedExercises,
        });
      });
    }
  }, [exercises, data, loading, dispatch, id]);

  const addToRoutine = () => {
    const itemInRoutine = cart.find((cartItem) => cartItem._id === id);
    if (itemInRoutine) {
      dispatch({
        type: UPDATE_SETS,
        _id: id,
        setQuantity: parseInt(itemInRoutine.setQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        setQuantity: parseInt(itemInRoutine.setQuantity) + 1,
      });
      //================================================
      dispatch({
        type: UPDATE_REPS,
        _id: id,
        repQuantity: parseInt(itemInRoutine.repQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        repQuantity: parseInt(itemInRoutine.repQuantity) + 1,
      });
      dispatch({
        type: UPDATE_WEIGHT,
        _id: id,
        weightQuantity: parseInt(itemInRoutine.weightQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        weightQuantity: parseInt(itemInRoutine.weightQuantity) + 5,
      });
      //================================================
    } else {
      dispatch({
        type: ADD_TO_ROUTINE,
        exercise: { ...currentExercise, setQuantity: 1, reqQuantity: 1, weightQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentExercise, setQuantity: 1, reqQuantity: 1, weightQuantity: 1 });
    }
    dispatchAdd({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: `${currentExercise.name} Added! 💪✅`
      }
    })
  };

  const removeFromRoutine = () => {
    dispatch({
      type: REMOVE_FROM_ROUTINE,
      _id: currentExercise._id,
    });

    idbPromise('cart', 'delete', { ...currentExercise });

    dispatchDelete({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: `${currentExercise.name} Removed! 🗑️❌`
      }
    })
  };

  return (
    <>
      {currentExercise && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to exercises</Link>

          <h2>{currentExercise.name}</h2>

          <p>{currentExercise.description}</p>

          <p>
            {Auth.loggedIn() ? (
              <div>
              <button onClick={addToRoutine}>Add Workout 💪</button>
              <button disabled={!cart.find((p) => p._id === currentExercise._id)} onClick={removeFromRoutine}>Remove Workout 🗑️</button>
              </div>
            ) : (
              <span><strong><a href="../Login">(log in to add workout)</a></strong></span>
            )}
            

          </p>
          <p>(Hover over image for demonstration)</p>
          <img className="static img-demo" src={`/images/${currentExercise.image}`} />
          <img className="active img-demo" src={`/images/${currentExercise.demo}`}></img>

        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;