export const currentGoalsSelector = (store) =>
  store.goalsReduser.usersGoals.find(
    (data) => data.userId === store.userReduser.id
  );

export const showEditGoalsSelector = (store) =>
  store.goalsReduser.showEditGoalsCard;
