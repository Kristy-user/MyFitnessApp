import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserAnalyticsStart = createAction(
  'LoadingUserAnalyticsStart'
);
export const setUserAnalytics = createAction('SettingUseAnalytics');
export const removeDataInfoSuccess = createAction('RemoveDataInfoSuccess');
export const loadingUserAnalyticsSuccess = createAction(
  'LoadingUserAnalyticsSuccess'
);
export const setDataAnalyticsSuccess = createAction('SetDataAnalyticsSuccess');

export const loadingUserAnalytics = (id) => {
  return (dispatch) => {
<<<<<<< HEAD
    fakeServerAPI
      .get(`/dataAnalytics?userId=${id}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserAnalyticsStart(response.data));
        }
      })

      .catch((error) => error);
=======
    fakeServerAPI.get(`/dataAnalytics?userId=${id}`).then((response) => {
      if (response.data) {
        dispatch(loadingUserAnalyticsStart(response.data));
      }
    });
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  };
};

export const addNewMonthAnalytics = (analytics) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    fakeServerAPI
      .post(`/dataAnalytics`, analytics)
      .then((response) => {
        dispatch(setUserAnalytics(response.data));
      })
<<<<<<< HEAD
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
=======
      .then(() => dispatch(setDataAnalyticsSuccess(true)));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  };
};

export const refreshAnalytics = (analytics, id) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    dispatch(removeDataInfoSuccess(id));
    fakeServerAPI
      .put(`/dataAnalytics/${id}`, analytics)
      .then((response) => {
        dispatch(setUserAnalytics(response.data));
      })
<<<<<<< HEAD
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
=======
      .then(() => dispatch(setDataAnalyticsSuccess(true)));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  };
};
