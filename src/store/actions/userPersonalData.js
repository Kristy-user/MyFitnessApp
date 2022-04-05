import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const setUserPersonalData = createAction('SetUserPersonalData');
export const loadingUserPersonalData = createAction('LoadingUserPersonalData');
export const removeUserPersonalData = createAction('RemoveUserPersonalData');
export const loadingUserAvatar = createAction('LoadingUserAvatar');
export const removeUserAvatar = createAction('RemoveUserAvatar');
export const setUserAvatar = createAction('SetUserAvatar');

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
      })
      .then((response) => {
        dispatch(setUserPersonalData(response.data));
      });
  };
};
export const refreshUserPersonalData = (data, current) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/userPersonalData/${current.id}`)
      .then(() => dispatch(removeUserPersonalData(current.id)))
      .then(() => {
        dispatch(newUserPersonalData(data, current.userId));
      });
  };
};

export const setNewUserAvatar = (image, id) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/userAvatar`, {
        userId: id,
        image: image,
      })
      .then((response) => {
        dispatch(setUserAvatar(response.data));
      });
  };
};
export const refreshUserAvatar = (image, avatar) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/userAvatar/${avatar.id}`)
      .then(() => {
        dispatch(removeUserAvatar(avatar.id));
      })
      .then(() => {
        dispatch(setNewUserAvatar(image, avatar.userId));
      });
  };
};
