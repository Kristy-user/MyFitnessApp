export const userAnalyticsDateSelector = (store) =>
  store.todayAnalyticsReducer.analyticsData.filter(
    (data) => data.userId === store.userReduser.id
  );
export const isTodayAnalyticsSelector = (store) =>
  store.todayAnalyticsReducer.isTodayAnalytics;
