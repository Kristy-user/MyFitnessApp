import { createReducer } from '@reduxjs/toolkit';
import {
  loadingUserWaterPerformance,
  settingUserWaterPerformance,
} from '../actions/performance';

const initialState = {
  numberFullGlass: null,
};

export const performanceReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadingUserWaterPerformance, (state, action) => {
    state.numberFullGlass = action.payload;
  });
  builder.addCase(settingUserWaterPerformance, (state, action) => {
    state.numberFullGlass = action.payload;
  });
});
