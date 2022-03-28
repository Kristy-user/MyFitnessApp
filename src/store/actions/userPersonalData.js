import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const setUserPersonalData = createAction('SetUserPersonalData');
export const loadingUserPersonalData = createAction('LoadingUserPersonalData');
export const removeUserPersonalData = createAction('RemoveUserPersonalData');

export const refreshUserPersonalData = (data, current) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/userPersonalData/${current.id}`)
      .then(() => dispatch(removeUserPersonalData(current.id)));
    fakeServerAPI
      .post(`/userPersonalData`, {
        userId: current.userId,
        name: data.name,
        surname: data.surname,
        age: data.age,
        height: data.height,
        weight: data.weight,
      })
      .then((response) => {
        dispatch(setUserPersonalData(response.data));
      });
  };
};
export const newUserPersonalData = (data, id) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/userPersonalData`, {
        userId: id,
        name: data.name,
        surname: data.surname,
        age: data.age,
        height: data.height,
        weight: data.weight,
        filled: true,
      })
      .then((response) => {
        dispatch(setUserPersonalData(response.data));
      });
  };
};
