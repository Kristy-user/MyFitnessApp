import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTodayAnalytics = createAction('LoadingTodayAnalytics');
export const newDayAnalytics = createAction('NewDayAnalytics');
export const removeTodayInfoSuccess = createAction('RemoveTodayInfoSuccess');

export const setTodayAnalyticsInfo = (analytics, userId) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataTodayAnalytics`, {
        numberSteps: analytics.numberSteps,
        weight: analytics.weight,
        date: analytics.date,
        userId: userId,
      })
      .then((response) =>
        dispatch(
          newDayAnalytics({
            userId: userId,
            date: analytics.date,
            numberSteps: analytics.numberSteps,
            weight: analytics.weight,
            id: response.data.id,
          })
        )
      );
  };
};

export const removeTodayInfo = (id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/dataTodayAnalytics/${id}`)
      .then(() => dispatch(removeTodayInfoSuccess(id)));
  };
};
