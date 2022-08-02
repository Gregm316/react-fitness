import React, { useContext, ReactDOM } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_ROUTINE, UPDATE_SETS, UPDATE_REPS, UPDATE_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useState, useEffect } from "react";
import './style.css'
import { storeKeyNameFromField } from '@apollo/client/utilities';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NotificationContext } from '../../Notifications/NotificationProvider';
import { v4 } from "uuid";
import NotesList from '../Notes/NotesList';
import { nanoid } from 'nanoid';


const RoutineItem = ({ item }) => {


  //======================================
  const [set, setSet] = useState('');
  const [rep, setRep] = useState('');
  const [weight, setWeight] = useState('');
  const dispatchDelete = useContext(NotificationContext);
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

  // const onChangeSet = (e) => {
  //   const value = e.target.value;
  //   dispatch({
  //     type: UPDATE_CART_QUANTITY,
  //     _id: item._id,
  //     setQuantity: parseInt(value)
  //   });
  //   idbPromise('cart', 'put', { ...item, setQuantity: parseInt(value) });
  // }

  // const onChangeRep = (e) => {
  //   const value = e.target.value;
  //   dispatch({
  //     type: UPDATE_CART_QUANTITY,
  //     _id: item._id,
  //     repQuantity: parseInt(value)
  //   });
  //   idbPromise('cart', 'put', { ...item, repQuantity: parseInt(value) });
  // }

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

  const [notes, setNotes] = useState([
    // {
    //   id: nanoid(),
    //   text: 'This is my first note!',
    //   date: '15/04/2021',
    // },
    // {
    //   id: nanoid(),
    //   text: 'This is my second note!',
    //   date: '21/04/2021',
    // },
    // {
    //   id: nanoid(),
    //   text: 'This is my third note!',
    //   date: '28/04/2021',
    // },
    // {
    //   id: nanoid(),
    //   text: 'This is my new note!',
    //   date: '30/04/2021',
    // },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div>
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-6"> */}
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
                    {/* <a href="#" class="btn btn-primary">View Profile</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default RoutineItem;


