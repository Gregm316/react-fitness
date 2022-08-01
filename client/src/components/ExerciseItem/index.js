import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_ROUTINE, UPDATE_SETS, UPDATE_REPS, UPDATE_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { NotificationContext } from "../../Notifications/NotificationProvider";
import { v4 } from "uuid";
import Auth from '../../utils/auth';

function ExerciseItem(item) {
  const [state, dispatch] = useStoreContext();
  const dispatchAdd = useContext(NotificationContext);
  const dispatchError = useContext(NotificationContext);

  const {
    image,
    name,
    _id,
    // price,
    // quantity,
    mgroup
  } = item;

  const { cart } = state

  const addError = () => {
    dispatchError({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "ERROR",
        message: `Log in to add workout!`
      }
    })
  }

  const addToRoutine = () => {
    const itemInRoutine = cart.find((cartItem) => cartItem._id === _id)
    if (itemInRoutine) {
      dispatch({
        type: UPDATE_SETS,
        _id: _id,
        setQuantity: parseInt(itemInRoutine.setQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        setQuantity: parseInt(itemInRoutine.setQuantity) + 1
      });
      //============================================================
      dispatch({
        type: UPDATE_REPS,
        _id: _id,
        repQuantity: parseInt(itemInRoutine.repQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        repQuantity: parseInt(itemInRoutine.repQuantity) + 1
      });
      dispatch({
        type: UPDATE_WEIGHT,
        _id: _id,
        weightQuantity: parseInt(itemInRoutine.weightQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInRoutine,
        weightQuantity: parseInt(itemInRoutine.weightQuantity) + 1
      });
      //============================================================
    } else {
      dispatch({
        type: ADD_TO_ROUTINE,
        exercise: { ...item, setQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, setQuantity: 1 });
    }
    //============================================================

    dispatchAdd({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: `${name} Added!`
      }
    })

    //============================================================
  }

  return (
    <div className="card-home px-1 py-1">
      <Link to={`/exercises/${_id}`}>
        <img className="exercise-img"
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>{mgroup}</div>
      {/* <span>${price}</span> */}
      {Auth.loggedIn() ? (
        <button onClick={addToRoutine}>Add Workout</button>
      ) : (
        <span><strong><a href="Login">(log in to add)</a></strong></span>

      )}

    </div>
  );
}

export default ExerciseItem;