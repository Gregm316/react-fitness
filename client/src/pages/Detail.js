import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_CART_REPS,
  UPDATE_CART_WEIGHT,
  ADD_TO_CART,
  UPDATE_EXERCISE,
} from '../utils/actions';
import { QUERY_EXERCISE } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentExercise, setCurrentExercise] = useState({});

  const { loading, data } = useQuery(QUERY_EXERCISE);

  const { exercises, cart } = state;

  useEffect(() => {
    // already in global store
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

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      //================================================
      dispatch({
        type: UPDATE_CART_REPS,
        _id: id,
        repQuantity: parseInt(itemInCart.repQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        repQuantity: parseInt(itemInCart.repQuantity) + 1,
      });
      dispatch({
        type: UPDATE_CART_WEIGHT,
        _id: id,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1,
      });
      //================================================
    } else {
      dispatch({
        type: ADD_TO_CART,
        exercise: { ...currentExercise, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentExercise, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentExercise._id,
    });

    idbPromise('cart', 'delete', { ...currentExercise });
  };

  return (
    <>
      {currentExercise && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to exercises</Link>

          <h2>{currentExercise.name}</h2>

          <p>{currentExercise.description}</p>

          <p>
            {/* <strong>Price:</strong>${currentExercise.price}{' '} */}
            <button onClick={addToCart}>Add Workout</button>
            <button
              disabled={!cart.find((p) => p._id === currentExercise._id)}
              onClick={removeFromCart}
            >
              Remove Workout
            </button>
          </p>
          <p>(Hover over image for demonstration)</p>
          <img className="static img-demo" src={`/images/${currentExercise.image}`} />
          <img className="active img-demo" src={`/images/${currentExercise.demo}`}></img>

        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      {/* <Cart /> */}
    </>
  );
}

export default Detail;
