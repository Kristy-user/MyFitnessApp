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
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserAnalyticsStart(response.data));
        }
      })
      .then(() => {
        dispatch(loadingUserAnalyticsSuccess(true));
      });
  };
};

export const addNewMonthAnalytics = (analytics) => {
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
    fakeServerAPI.delete(`/dataAnalytics/${id}`).then(() => {
      dispatch(removeDataInfoSuccess(id));
    });
  };
};
export const refreshAnalytics = (analytics, id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/dataAnalytics/${id}`)
      .then(() => {
        dispatch(removeDataInfoSuccess(id));
      })
      .then(() => {
        dispatch(addNewMonthAnalytics(analytics));
      });
  };
};
