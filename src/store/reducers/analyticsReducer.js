import { createReducer } from '@reduxjs/toolkit';
import {
  loadingUserAnalyticsStart,
  loadingUserAnalyticsSuccess,
  loadingUserTrainingAnalytics,
  loadingUserWaterAnalytics,
  removeDataInfoSuccess,
  removeWaterInfoSuccess,
  setDataAnalyticsSuccess,
  setUserAnalytics,
  setUserWaterAnalytics,
} from '../actions/analytics';

const initialState = {
  analyticsTraining: [],
  waterAnalytics: [],
  isLoaded: false,
  isSetData: true,
};
export const analyticsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingUserTrainingAnalytics, (state, action) => {
      state.analyticsTraining = action.payload;
    })
    .addCase(loadingUserWaterAnalytics, (state, action) => {
      state.waterAnalytics = action.payload;
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
    })
    .addCase(setUserWaterAnalytics, (state, action) => {
      state.waterAnalytics = [...state.waterAnalytics, action.payload];
    })
    .addCase(removeWaterInfoSuccess, (state, action) => {
      state.waterAnalytics = state.waterAnalytics.filter(
        (data) => data.id !== action.payload
      );
    })
    .addCase(setDataAnalyticsSuccess, (state, action) => {
      state.isSetData = action.payload;
    });
});
