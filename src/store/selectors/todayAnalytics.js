export const userAnalyticsDateSelector = (store) =>
  store.todayAnalyticsReducer.analyticsData.filter(
    (data) => data.userId === store.userReduser.id
  );
<<<<<<< HEAD
export const isTodayAnalyticsSelector = (store) =>
  store.todayAnalyticsReducer.isTodayAnalytics;
=======
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
