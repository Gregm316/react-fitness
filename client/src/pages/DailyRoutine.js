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
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

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

  function submitCheckout() {
    const exerciseIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.setQuantity; i++) {
        exerciseIds.push(item._id);
      }
    });

    getCheckout({
      variables: { exercises: exerciseIds },
    });
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
    <div className="cart">
      <h2>Workouts for Today</h2>
      {state.cart.length ? (
        <div className="container">
          <div className="row">
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
                      note.text.toLowerCase().includes(searchText)
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