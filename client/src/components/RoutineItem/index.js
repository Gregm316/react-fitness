import React, { useContext, ReactDOM } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_ROUTINE, UPDATE_SETS, UPDATE_REPS, UPDATE_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotificationContext } from '../../Notifications/NotificationProvider';
import { v4 } from "uuid";

const RoutineItem = ({ item }) => {

  //======================================
  const dispatchDelete = useContext(NotificationContext);
  //======================================

  const [, dispatch] = useStoreContext();

  const removeFromRoutine = item => {
    dispatch({
      type: REMOVE_FROM_ROUTINE,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

    dispatchDelete({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: `${item.name} Removed! 🗑️❌`
      }
    })

  };

  const onChangeSet = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_ROUTINE,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_SETS,
        _id: item._id,
        setQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, setQuantity: parseInt(value) });

    }
  }

  const onChangeRep = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_ROUTINE,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_REPS,
        _id: item._id,
        repQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, repQuantity: parseInt(value) });

    }
  }

  const onChangeWeight = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_ROUTINE,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_WEIGHT,
        _id: item._id,
        weightQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, weightQuantity: parseInt(value) });

    }
  }

  return (
    <div>
      <div className="card">
        <div className="row no-gutters">
          <div className="col-sm-6">
            <img className='daily-img'
              src={`/images/${item.image}`}
              alt=""
            />
          </div>
          <div className="col-sm-6">
            <div className="card-body card-text card-spacing">
              <h5 className="card-title">{item.name}</h5>
              <div >
                <span>Sets:</span>
                <input
                  type="number"
                  name='set'
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
                  name='rep'
                  min={1}
                  max={100}
                  placeholder="1"
                  value={item.repQuantity}
                  onChange={onChangeRep}
                />
                <br></br>
                <span>Weight:</span>
                <input
                  type="number"
                  name='weight'
                  min={1}
                  max={500}
                  step={5}
                  placeholder="100"
                  value={item.weightQuantity}
                  onChange={onChangeWeight}
                />
                <span>lbs.</span>
                <br></br>
                <span
                  role="img"
                  aria-label="trash"
                  onClick={() => removeFromRoutine(item)}
                ><button className='mt-2'>
                    🗑️ Remove
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutineItem;


