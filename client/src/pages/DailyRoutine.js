// import React from 'react';
// import { Link } from 'react-router-dom';

// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';

// function DailyRoutine() {
//   const { data } = useQuery(QUERY_USER);
//   let user;

//   if (data) {
//     user = data.user;
//   }

//   return (
//     <>
//       <div className="container my-1">
//         <Link to="/">← Back to exercises</Link>

//         {user ? (
//           <>
//             <h2>
//               Daily Routine for {console.log(user)} {user.firstName} {user.lastName}
//             </h2>
//             {user.orders.map((order) => (
//               <div key={order._id} className="my-2">
//                 <h3>
//                   {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
//                 </h3>
//                 <div className="flex-row">
//                   {order.exercises.map(({ _id, image, name, /*price*/ }, index) => (
//                     <div key={index} className="card px-1 py-1">
//                       <Link to={`/exercises/${_id}`}>
//                         <img alt={name} src={`/images/${image}`} />
//                         <p>{name}</p>
//                       </Link>
//                       {/* <div>
//                         <span>${price}</span>
//                       </div> */}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : null}
//       </div>
//     </>
//   );
// }

// export default DailyRoutine;


import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from '../components/CartItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';

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
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, exercises: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function submitCheckout() {
    const exerciseIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
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
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
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
// export default Cart;

