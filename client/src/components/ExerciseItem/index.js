import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_ROUTINE, UPDATE_SETS, UPDATE_REPS, UPDATE_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { NotificationContext } from "../../Notifications/NotificationProvider";
import { v4 } from "uuid";

function ExerciseItem(item) {
  const [state, dispatch] = useStoreContext();
  const dispatchAdd = useContext(NotificationContext);

  const {
    image,
    name,
    _id,
    // price,
    quantity,
    mgroup
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_SETS,
        _id: _id,
        setQuantity: parseInt(itemInCart.setQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        setQuantity: parseInt(itemInCart.setQuantity) + 1
      });
      //============================================================
      dispatch({
        type: UPDATE_REPS,
        _id: _id,
        repQuantity: parseInt(itemInCart.repQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        repQuantity: parseInt(itemInCart.repQuantity) + 1
      });
      dispatch({
        type: UPDATE_WEIGHT,
        _id: _id,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1
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
      <button onClick={addToCart}>Add Workout</button>
    </div>
  );
}

export default ExerciseItem;
