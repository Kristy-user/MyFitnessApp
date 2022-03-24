import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTodayAnalytics = createAction('LoadingTodayAnalytics');
export const newDayAnalytics = createAction('NewDayAnalytics');
export const removeTodayInfoSuccess = createAction('RemoveTodayInfoSuccess');

export const refreshTodayAnalyticsInfo = (analytics, id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/dataTodayAnalytics/${id}`)
      .then(() => dispatch(removeTodayInfoSuccess(id)))
      .then(() =>
        fakeServerAPI.post(`/dataTodayAnalytics`, {
          numberSteps: analytics.numberSteps,
          weight: analytics.weight,
          date: analytics.date,
          userId: analytics.userId,
          id: id,
        })
      )
      .then(() =>
        dispatch(
          newDayAnalytics({
            numberSteps: analytics.numberSteps,
            weight: analytics.weight,
            date: analytics.date,
            userId: analytics.userId,
            id: id,
          })
        )
      );
  };
};
export const setTodayAnalyticsInfo = (analytics) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataTodayAnalytics`, {
        numberSteps: analytics.numberSteps,
        weight: analytics.weight,
        date: analytics.date,
        userId: analytics.userId,
      })

      .then((response) =>
        dispatch(
          newDayAnalytics({
            numberSteps: analytics.numberSteps,
            weight: analytics.weight,
            date: analytics.date,
            userId: analytics.userId,
            id: response.data.id,
          })
        )
      );
  };
};
