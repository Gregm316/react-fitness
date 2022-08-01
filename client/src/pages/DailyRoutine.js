import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import RoutineItem from '../components/RoutineItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_ROUTINE, ADD_MULTIPLE_TO_ROUTINE } from '../utils/actions';

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

  return (
    <div className="cart">
      <h2>Workouts for Today</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <RoutineItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">

            {Auth.loggedIn() ? (
              // <button onClick={submitCheckout}>Checkout</button>
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
// export default Routine;