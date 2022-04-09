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
    fakeServerAPI.get(`/dataAnalytics?userId=${id}`).then((response) => {
      if (response.data) {
        dispatch(loadingUserAnalyticsStart(response.data));
      }
    });
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
      .then(() => dispatch(setDataAnalyticsSuccess(true)));
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
      .then(() => dispatch(setDataAnalyticsSuccess(true)));
  };
};
