import { createAction } from '@reduxjs/toolkit';

import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserGoals = createAction('LoadingGoals');
export const createGoals = createAction('CreateGoals');
export const showEditGoalsCard = createAction('ShowEditGoalsCard');
export const removeUserGoals = createAction('RremoveUserGoals');
export const setGoalsRefreshedSuccess = createAction(
  'SetGoalsRefreshedSuccess'
);
export const refreshGoals = (goals, id) => {
  return (dispatch) => {
    dispatch(setGoalsRefreshedSuccess(false));
    dispatch(removeUserGoals(id));
    fakeServerAPI
      .put(`/dataGoals/${id}`, goals)
      .then((response) => {
        dispatch(createGoals(response.data));
      })
      .then(() => {
        dispatch(setGoalsRefreshedSuccess(true));
      })
      .then(() => {
        dispatch(showEditGoalsCard(false));
      })
      .catch((error) => error);
  };
};

export const createNewGoals = (goals) => {
  return (dispatch) => {
    dispatch(setGoalsRefreshedSuccess(false));
    fakeServerAPI
      .post(`/dataGoals`, goals)
      .then((response) => {
        dispatch(createGoals(response.data));
      })
      .then(() => {
        dispatch(setGoalsRefreshedSuccess(true));
      })
      .then(() => {
        dispatch(showEditGoalsCard(false));
      })
      .catch((error) => error);
  };
};
