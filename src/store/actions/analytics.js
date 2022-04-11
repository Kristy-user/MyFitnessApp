import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserTrainingAnalytics = createAction(
  'LoadingUserTrainingAnalytics'
);
export const loadingUserWaterAnalytics = createAction(
  'LoadingUserWaterAnalytics'
);
export const setUserAnalytics = createAction('SettingUseAnalytics');
export const removeDataInfoSuccess = createAction('RemoveDataInfoSuccess');
export const loadingUserAnalyticsSuccess = createAction(
  'LoadingUserAnalyticsSuccess'
);
export const setDataAnalyticsSuccess = createAction('SetDataAnalyticsSuccess');
export const setUserWaterAnalytics = createAction('SetUserWaterAnalytics');
export const removeWaterInfoSuccess = createAction('RemoveWaterInfoSuccess');

export const loadingUserAnalytics = (id) => {
  return (dispatch) => {
    dispatch(loadingUserAnalyticsSuccess(false));
    fakeServerAPI
      .get(`/trainingAnalytics?userId=${id}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserTrainingAnalytics(response.data));
        }
      })
      .catch((error) => error);
    fakeServerAPI
      .get(`/waterAnalytics?userId=${id}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserWaterAnalytics(response.data));
        }
      })
      .then(() => dispatch(loadingUserAnalyticsSuccess(true)))
      .catch((error) => error);
  };
};

export const addNewMonthTrainingAnalytics = (analytics) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    fakeServerAPI
      .post(`/trainingAnalytics`, analytics)
      .then((response) => {
        dispatch(setUserAnalytics(response.data));
      })
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
  };
};

export const refreshTrainingAnalytics = (analytics, id) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    dispatch(removeDataInfoSuccess(id));
    fakeServerAPI
      .put(`/trainingAnalytics/${id}`, analytics)
      .then((response) => {
        dispatch(setUserAnalytics(response.data));
      })
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
  };
};

export const addNewMonthWaterAnalytics = (analytics) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    fakeServerAPI
      .post(`/waterAnalytics`, analytics)
      .then((response) => {
        dispatch(setUserWaterAnalytics(response.data));
      })
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
  };
};

export const refreshWaterAnalytics = (analytics, id) => {
  return (dispatch) => {
    dispatch(setDataAnalyticsSuccess(false));
    dispatch(removeWaterInfoSuccess(id));
    fakeServerAPI
      .put(`/waterAnalytics/${id}`, analytics)
      .then((response) => {
        dispatch(setUserWaterAnalytics(response.data));
      })
      .then(() => dispatch(setDataAnalyticsSuccess(true)))
      .catch((error) => error);
  };
};
