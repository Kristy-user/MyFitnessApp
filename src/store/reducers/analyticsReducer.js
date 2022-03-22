import { createReducer } from '@reduxjs/toolkit';
import {
  loadingUserAnalytics,
  settingUserAnalytics,
} from '../actions/analytics';

const initialState = {
  analyticsTraining: [],
  numberFullGlass: null,
};
export const analyticsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingUserAnalytics, (state, action) => {
      state.analyticsTraining = action.payload;
    })

    .addCase(settingUserAnalytics, (state, action) => {
      state.analyticsTraining = [...state.analyticsTraining, action.payload];
    });
});
