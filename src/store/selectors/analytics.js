export const allActivitiesDoneSelector = (store) =>
  store.analyticsReducer.analyticsTraining.filter(
    (data) => data.userId === store.userReduser.id
  );
export const isLoadedDataSelector = (store) => store.analyticsReducer.isLoaded;
