export const userAnalyticsDateSelector = (store) =>
  store.todayAnalyticsReducer.analyticsData.filter(
    (data) => data.userId === store.userReduser.id
  );
