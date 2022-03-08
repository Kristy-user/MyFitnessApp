import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserWaterPerformance = createAction(
  'LoadingUserWaterPerformanse'
);
export const settingUserWaterPerformance = createAction(
  'SettingUserWaterPerformanse'
);

export const refreshWaterPerformance = (water, id) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/dataPerformance`, {
        [id]: {
          numberFullGlass: water,
        },
      })
      .then(() => dispatch(settingUserWaterPerformance(water)));
  };
};
