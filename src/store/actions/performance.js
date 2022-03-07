import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingUserWaterPerformance = createAction(
  'LoadingUserWaterPerformanse'
);
export const settingUserWaterPerformance = createAction(
  'SettingUserWaterPerformanse'
);

// export const loadingDrankWater = (water, id) => {
//   return (dispatch) => {
//     fakeServerAPI
//       .post(`/dataPerformance`, {
//         [id]: {
//           water: water,

//         },
//       })
//       .then(() => dispatch(loadingDrankWater(goals)));
//   };
// };
