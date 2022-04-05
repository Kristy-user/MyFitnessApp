export const userPersonalData = (store) =>
  store.userPersonalDataReduser.userPersonalData;
export const currentUserPersonalData = (store) =>
  store.userPersonalDataReduser.userPersonalData.find(
    (data) => data.userId === store.userReduser.id
  );
export const currentUserAvatar = (store) =>
  store.userPersonalDataReduser.userAvatar.find(
    (data) => data.userId === store.userReduser.id
  );
