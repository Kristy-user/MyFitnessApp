import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserAnalytics = createAction('LoadingUserAnalytics');
export const settingUserAnalytics = createAction('SettingUseAnalytics');

export const refreshAnalytics = (analytics) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataAnalytics`, {
        numberFullGlass: analytics.numberFullGlass,
        numberPowerTraining: analytics.numberPowerTraining,
        numberCardioTraining: analytics.numberCardioTraining,
        userId: analytics.id,
        date: analytics.date,
      })
      .then(() => dispatch(settingUserAnalytics(analytics)));
  };
};
