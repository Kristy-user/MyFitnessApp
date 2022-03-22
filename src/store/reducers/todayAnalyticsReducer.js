import { createReducer } from '@reduxjs/toolkit';
import {
  loadingTodayAnalytics,
  newDayAnalytics,
  removeTodayInfoSuccess,
} from '../actions/todayAnalytics';

const initialState = {
  analyticsData: [],
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
    });
});
