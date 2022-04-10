import { createReducer } from '@reduxjs/toolkit';
import {
  loadingTodayAnalytics,
  newDayAnalytics,
  removeTodayInfoSuccess,
  setTodayAnalyticsSuccess,
} from '../actions/todayAnalytics';

const initialState = {
  analyticsData: [],
  isTodayAnalytics: '',
};

export const todayAnalyticsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingTodayAnalytics, (state, action) => {
      state.analyticsData = action.payload;
    })
    .addCase(newDayAnalytics, (state, action) => {
      state.analyticsData = [...state.analyticsData, action.payload];
    })
    .addCase(removeTodayInfoSuccess, (state, action) => {
      state.analyticsData = state.analyticsData.filter(
        (data) => data.id !== action.payload
      );
    })
    .addCase(setTodayAnalyticsSuccess, (state, action) => {
      state.isTodayAnalytics = action.payload;
    });
});
