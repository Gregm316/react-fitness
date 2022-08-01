import React, { useEffect } from 'react';
import ExerciseItem from '../ExerciseItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_EXERCISE } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ExerciseList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_EXERCISE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EXERCISE,
        exercises: data.exercises,
      });
      data.exercises.forEach((exercise) => {
        idbPromise('exercises', 'put', exercise);
      });
    } else if (!loading) {
      idbPromise('exercises', 'get').then((exercises) => {
        dispatch({
          type: UPDATE_EXERCISE,
          exercises: exercises,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterExercises() {
    if (!currentCategory) {
      return state.exercises;
    }

    return state.exercises.filter(
      (exercise) => exercise.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our exercises:</h2>
      {state.exercises.length ? (
        <div className="flex-row">
          {filterExercises().map((exercise) => (
            <ExerciseItem
              key={exercise._id}
              _id={exercise._id}
              image={exercise.image}
              name={exercise.name}
              // price={exercise.price}
              mgroup={exercise.mgroup} 
              quantity={exercise.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any exercises yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ExerciseList;
