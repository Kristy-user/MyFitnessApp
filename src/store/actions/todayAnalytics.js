import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTodayAnalytics = createAction('LoadingTodayAnalytics');
export const newDayAnalytics = createAction('NewDayAnalytics');
export const removeTodayInfoSuccess = createAction('RemoveTodayInfoSuccess');

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

export const refreshTodayAnalyticsInfo = (analytics, id) => {
  return (dispatch) => {
    dispatch(removeTodayInfoSuccess(id));
    // fakeServerAPI.put(`/dataTodayAnalytics/${id}`, analytics);
    // .then((response) => {

    //   dispatch(
    //     newDayAnalytics({
    //       numberSteps: analytics.numberSteps,
    //       weight: analytics.weight,
    //       date: analytics.date,
    //       userId: analytics.userId,
    //       id: response.data.id,
    //     })
    //   );
    // });
  };
};
