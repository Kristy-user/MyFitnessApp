import { createAction } from '@reduxjs/toolkit';

import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserGoals = createAction('LoadingGoals');
export const createGoals = createAction('CreateGoals');
export const editGoal = createAction('EditGoal');

export const createNewGoals = (goals, id) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataGoals`, {
        [id]: {
          water: goals.water,
          powerTraining: goals.powerTraining,
          cardioTraining: goals.cardioTraining,
          steps: goals.steps,
          weight: goals.weight,
        },
      })
      .then(() => dispatch(createGoals(goals)));
  };
};

export const EditUserGoals = (goal, value, id) => {
  return (dispatch) => {
    fakeServerAPI
      .put(`/dataGoals`, {
        [id]: {
          goal: value,
        },
      })
      .then(() => dispatch(editGoal(goal, value)));
  };
};
