import { createAction } from '@reduxjs/toolkit';

import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserGoals = createAction('LoadingGoals');
export const createGoals = createAction('CreateGoals');
export const showEditGoalsCard = createAction('ShowEditGoalsCard');
export const removeUserGoals = createAction('RremoveUserGoals');

export const refreshGoals = (goals, current) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataGoals`, {
        userId: current.userId,
        water: goals.water,
        powerTraining: goals.powerTraining,
        cardioTraining: goals.cardioTraining,
        steps: goals.steps,
        weight: goals.weight,
        filled: true,
      })
      .then((response) => {
        dispatch(createGoals(response.data));
      });
    fakeServerAPI
      .delete(`/dataGoals/${current.id}`)
      .then(() => dispatch(removeUserGoals(current.id)))
      .then((response) => {
        console.log('true');
        dispatch(showEditGoalsCard(true));
      });
  };
};

export const createNewGoals = (goals, id) => {
  return (dispatch) => {
    console.log(goals);
    fakeServerAPI
      .post(`/dataGoals`, {
        userId: id,
        water: goals.water,
        powerTraining: goals.powerTraining,
        cardioTraining: goals.cardioTraining,
        steps: goals.steps,
        weight: goals.weight,
        filled: true,
      })
      .then((response) => {
        dispatch(createGoals(response.data));
      })
      .then(() => showEditGoalsCard(true));
  };
};
