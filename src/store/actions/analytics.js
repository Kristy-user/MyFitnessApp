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

export const loadingUserAnalytics = (id) => {
  return (dispatch) => {
    fakeServerAPI
      .get(`/dataAnalytics?userId=${id}`)
      .then((response) =>
        response.data ? dispatch(loadingUserAnalyticsStart(response.data)) : {}
      )
      .then(() => dispatch(loadingUserAnalyticsSuccess(true)));
  };
};

export const refreshAnalytics = (analytics, id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/dataAnalytics/${id}`)
      .then(() => dispatch(removeDataInfoSuccess(id)))
      .then(() =>
        fakeServerAPI.post(`/dataAnalytics`, {
          numberFullGlass: analytics.numberFullGlass,
          numberPowerTraining: analytics.numberPowerTraining,
          numberCardioTraining: analytics.numberCardioTraining,
          userId: analytics.userId,
          date: analytics.date,
          id: id,
        })
      )
      .then((response) => {
        console.log(response.data);
        dispatch(
          setUserAnalytics({
            numberFullGlass: analytics.numberFullGlass,
            numberPowerTraining: analytics.numberPowerTraining,
            numberCardioTraining: analytics.numberCardioTraining,
            userId: analytics.userId,
            date: analytics.date,
            id: id,
          })
        );
      });
  };
};
export const addNewMounthAnalytics = (analytics) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataAnalytics`, {
        numberFullGlass: analytics.numberFullGlass,
        numberPowerTraining: analytics.numberPowerTraining,
        numberCardioTraining: analytics.numberCardioTraining,
        userId: analytics.userId,
        date: analytics.date,
      })
      .then((response) =>
        dispatch(
          setUserAnalytics({
            numberFullGlass: analytics.numberFullGlass,
            numberPowerTraining: analytics.numberPowerTraining,
            numberCardioTraining: analytics.numberCardioTraining,
            userId: analytics.userId,
            date: analytics.date,
            id: response.data.id,
          })
        )
      );
  };
};

export const removeDataInfo = (id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/dataAnalytics/${id}`)
      .then(() => dispatch(removeDataInfoSuccess(id)));
  };
};
