import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const editUserPersonalData = createAction('EditUserPersonalData');
export const setUserPersonalData = createAction('SetUserPersonalData');

export const refreshUserPersonalData = (data, id) => {
  return (dispatch) => {
    fakeServerAPI
      .put(`/userPersonalData`, {
        [id]: {
          name: data.name,
          surname: data.surname,
          age: data.age,
          height: data.height,
          weight: data.weight,
        },
      })
      .then(() => dispatch(setUserPersonalData(data)));
  };
};
