import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserWaterAnalytics = createAction(
  'LoadingUserWaterAnalytics'
);
export const settingUserWaterAnalytics = createAction(
  'SettingUserWaterAnalytics'
);

export const refreshWaterAnalytics = (water, id) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataAnalytics`, {
        [id]: {
          numberFullGlass: water,
        },
      })
      .then(() => dispatch(settingUserWaterAnalytics(water)));
  };
};
