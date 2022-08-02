import React, { useEffect, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import RoutineItem from '../components/RoutineItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_ROUTINE, ADD_MULTIPLE_TO_ROUTINE } from '../utils/actions';
import NotesList from '../components/Notes/NotesList';
import { nanoid } from 'nanoid';
import 'bootstrap/dist/css/bootstrap.min.css'


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DailyRoutine = () => {
  const [state, dispatch] = useStoreContext();
  const [, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getRoutine() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_ROUTINE, exercises: [...cart] });
    }

    if (!state.cart.length) {
      getRoutine();
    }
  }, [state.cart.length, dispatch]);

  const [notes, setNotes] = useState([]);

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

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  return (
    <div className="cart">
      <h2>Workouts for Today {formatDate(new Date())}</h2>
      {state.cart.length ? (
        <div className="card card-margin-r">
          <div className="row daily-background">
            <div className="col-sm-6">
              {state.cart.map((item) => (
                <RoutineItem key={item._id} item={item} />
              ))}
            </div>
            <div className="col-sm-6">
            <div className="row card-spacing">
              <div>
                <div className="row no-gutters notes-card">
                  <h2 className='note-header'>Notes:</h2>
                  <NotesList
                    notes={notes.filter((note) =>
                      note.text.toLowerCase()
                    )}
                    handleAddNote={addNote}
                    handleDeleteNote={deleteNote}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="flex-row space-between">

            {Auth.loggedIn() ? (
              <div></div>
            ) : (
              <span>(log in to view workout)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything workouts yet!
        </h3>
      )}
    </div>
  );
};

export default DailyRoutine;