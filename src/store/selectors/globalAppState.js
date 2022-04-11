export const globalErrors = (store) => store.globalAppStateReduser.errors;

export const statusCode = (store) =>
  store.globalAppStateReduser.errors.statusCode;
