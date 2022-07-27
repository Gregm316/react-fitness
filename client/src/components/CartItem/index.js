import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './style.css'

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChangeSet = (e) => {
    const value = e.target.value;
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      setQuantity: parseInt(value)
    });
    idbPromise('cart', 'put', { ...item, setQuantity: parseInt(value) });

  }

  const onChangeRep = (e) => {
    const value = e.target.value;
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      repQuantity: parseInt(value)
    });
    idbPromise('cart', 'put', { ...item, repQuantity: parseInt(value) });

  }


  return (
    <div className="flex-row">
      <div>
        <img className='daily-img'
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}{/*, ${item.price}*/}</div>
        <div>
          <span>Sets :</span>
          <input
            type="number"
            min={1}
            max={100}
            placeholder="1"
            value={item.setQuantity}
            onChange={onChangeSet}
          />
          <br></br>
          <span>Reps:</span>
          <input
            type="number"
            min={1}
            max={100}
            placeholder="1"
            value={item.repQuantity}
            onChange={onChangeRep}
          />
          <br></br>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
