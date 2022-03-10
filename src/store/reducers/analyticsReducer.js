import { createReducer } from '@reduxjs/toolkit';
import {
  loadingUserWaterAnalytics,
  settingUserWaterAnalytics,
} from '../actions/analytics';

const initialState = {
  numberFullGlass: 0,
};

export const analyticsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadingUserWaterAnalytics, (state, action) => {
    state.numberFullGlass = action.payload;
  });
  builder.addCase(settingUserWaterAnalytics, (state, action) => {
    state.numberFullGlass = action.payload;
  });
});
