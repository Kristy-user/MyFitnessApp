export const allActivitiesDoneSelector = (store) =>
  store.analyticsReducer.analyticsTraining;
export const isLoadedDataSelector = (store) => store.analyticsReducer.isLoaded;
