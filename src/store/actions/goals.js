import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const createGoals = createAction('CreateGoals');

export const createNewGoals = (goals) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataGoals`, {
        water: goals.water,
        powerTraining: goals.powerTraining,
        cardioTraining: goals.cardioTraining,
        steps: goals.steps,
      })
      .then(() => dispatch(createGoals(goals)));
  };
};
