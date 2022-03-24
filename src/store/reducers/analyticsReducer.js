import { createReducer } from '@reduxjs/toolkit';
import {
  loadingUserAnalyticsStart,
  loadingUserAnalyticsSuccess,
  removeDataInfoSuccess,
  setUserAnalytics,
} from '../actions/analytics';

const initialState = {
  analyticsTraining: [],
  isLoaded: false,
};
export const analyticsReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loadingUserAnalyticsStart, (state, action) => {
      state.analyticsTraining = action.payload;
    })
    .addCase(loadingUserAnalyticsSuccess, (state, action) => {
      state.isLoaded = action.payload;
    })
    .addCase(setUserAnalytics, (state, action) => {
      state.analyticsTraining = [...state.analyticsTraining, action.payload];
    })
    .addCase(removeDataInfoSuccess, (state, action) => {
      state.analyticsTraining = state.analyticsTraining.filter(
        (data) => data.id !== action.payload
      );
    });
});
