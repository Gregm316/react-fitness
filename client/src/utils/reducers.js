import { useReducer } from 'react';
import {
  UPDATE_EXERCISE,
  ADD_TO_ROUTINE,
  UPDATE_SETS,
  UPDATE_REPS,
  UPDATE_WEIGHT,
  REMOVE_FROM_ROUTINE,
  ADD_MULTIPLE_TO_ROUTINE,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_ROUTINE,
  TOGGLE_ROUTINE,
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an update exercises array. We use the action.exercises property and spread it's contents into the new array.
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: [...action.exercises],
      };

    case ADD_TO_ROUTINE:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.exercise],
      };
    case ADD_MULTIPLE_TO_ROUTINE:
      return {
        ...state,
        cart: [...state.cart, ...action.exercises],
      };
    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the set quantity.
    case UPDATE_SETS:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((exercise) => {
          if (action._id === exercise._id) {
            exercise.setQuantity = action.setQuantity;
            //==========================================
            exercise.repQuantity = action.repQuantity;
            exercise.weightQuantity = action.weightQuantity;
            //==========================================
          }
          return exercise;
        }),
      };

    case UPDATE_REPS:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((exercise) => {
          if (action._id === exercise._id) {
            //==========================================
            exercise.repQuantity = action.repQuantity;
            //==========================================
          }
          return exercise;
        }),
      };

      case UPDATE_WEIGHT:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map((exercise) => {
            if (action._id === exercise._id) {
              exercise.weightQuantity = action.weightQuantity;
              //==========================================
              exercise.weightQuantity = action.weightQuantity;
              //==========================================
            }
            return exercise;
          }),
        };

    // First we iterate through each item in the cart and check to see if the `exercise._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_ROUTINE:
      let newState = state.cart.filter((exercise) => {
        return exercise._id !== action._id;
      });

      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_ROUTINE:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_ROUTINE:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useExerciseReducer(initialState) {
  return useReducer(reducer, initialState);
}