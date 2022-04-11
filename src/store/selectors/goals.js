export const currentGoalsSelector = (store) =>
  store.goalsReduser.usersGoals.filter(
    (data) => data.userId === store.userReduser.id
  );

export const showEditGoalsSelector = (store) =>
  store.goalsReduser.showEditGoalsCard;
export const isGoalsSetSelector = (store) => store.goalsReduser.isSetGoals;
