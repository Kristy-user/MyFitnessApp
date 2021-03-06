import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTodayAnalytics = createAction('LoadingTodayAnalytics');
export const newDayAnalytics = createAction('NewDayAnalytics');
export const removeTodayInfoSuccess = createAction('RemoveTodayInfoSuccess');
export const setTodayAnalyticsSuccess = createAction(
  'SetTodayAnalyticsSuccess'
);

export const setTodayAnalyticsInfo = (analytics) => {
  return (dispatch) => {
    dispatch(setTodayAnalyticsSuccess(''));
    fakeServerAPI
      .post(`/dataTodayAnalytics`, {
        numberSteps: analytics.numberSteps,
        weight: analytics.weight,
        date: analytics.date,
        userId: analytics.userId,
      })
      .then((response) => {
        dispatch(
          newDayAnalytics({
            numberSteps: analytics.numberSteps,
            weight: analytics.weight,
            date: analytics.date,
            userId: analytics.userId,
            id: response.data.id,
          })
        );
        dispatch(setTodayAnalyticsSuccess(response.response));
      })

      .catch((error) => error);
  };
};

export const refreshTodayAnalyticsInfo = (analytics, id) => {
  return (dispatch) => {
    dispatch(setTodayAnalyticsSuccess(''));
    dispatch(removeTodayInfoSuccess(id));
    fakeServerAPI
      .put(`/dataTodayAnalytics/${id}`, analytics)
      .then((response) => {
        dispatch(
          newDayAnalytics({
            numberSteps: response.data.numberSteps,
            weight: response.data.weight,
            date: response.data.date,
            userId: response.data.userId,
            id: response.data.id,
          })
        );
        dispatch(setTodayAnalyticsSuccess(response.data));
      })
      .catch((error) => error);
  };
};
