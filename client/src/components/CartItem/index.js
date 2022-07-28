import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useState, useEffect } from "react";
import './style.css'
import { storeKeyNameFromField } from '@apollo/client/utilities';


const CartItem = ({ item }) => {


  //======================================
  const [set, setSet] = useState('');
  const [rep, setRep] = useState('');
  const [weight, setWeight] = useState('');
  //======================================

  const [, dispatch] = useStoreContext();

  //======================================
  useEffect(() => {
    // storing input name
    localStorage.setItem("set", JSON.stringify(set));
  }, [set]);

  useEffect(() => {
    // storing input name
    localStorage.setItem("rep", JSON.stringify(rep));
  }, [rep]);

  useEffect(() => {
    // storing input name
    localStorage.setItem("weight", JSON.stringify(weight));
  }, [weight]);

  // useEffect(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem("set");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });

  // useEffect(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem("rep");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });

  // useEffect(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem("weight");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });
  //======================================

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

  const onChangeWeight = (e) => {
    const value = e.target.value;
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      weightQuantity: parseInt(value)
    });
    idbPromise('cart', 'put', { ...item, weightQuantity: parseInt(value) });
  }

  const setValue = () => {
    const savedSet = localStorage.getItem('set')
    // console.log(savedSet);
    if (savedSet === "") {
      return
    } else {
      return savedSet
    }
  }

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row exercise-card">
      <div>
        <img className='daily-img'
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div className='exercise-info'>
        <div><strong>{item.name}</strong>{/*, ${item.price}*/}</div>
        <div >
          <span>Sets:</span>
          <input
            type="number"
            name='set'
            min={1}
            max={100}
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <br></br>
          <span>Reps:</span>
          <input
            type="number"
            name='rep'
            min={1}
            max={100}
            placeholder="1"
            // value={item.repQuantity}
            // onChange={onChangeRep}
            onChange={(e) => setRep(e.target.value)}
          />
          <br></br>
          <span>Weight:</span>
          <input
            type="number"
            name='weight'
            min={0}
            max={500}
            step={5}
            placeholder="100"
            // value={item.weightQuantity}
            // onChange={onChangeWeight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <span>lbs.</span>
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
