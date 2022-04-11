export const allActivitiesDoneSelector = (store) =>
  store.analyticsReducer.analyticsTraining.filter(
    (data) => data.userId === store.userReduser.id
  );
export const waterDoneSelector = (store) =>
  store.analyticsReducer.waterAnalytics.filter(
    (data) => data.userId === store.userReduser.id
  );
export const isLoadedDataSelector = (store) => store.analyticsReducer.isLoaded;
export const isDataSetSelector = (store) => store.analyticsReducer.isSetData;
