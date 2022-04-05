export const taskListSelector = (store) => store.tasksReduser.tasksList;
export const currentTaskListSelector = (store) =>
  store.tasksReduser.tasksList.filter(
    (data) => data.userId === store.userReduser.id
  );
export const taskEditSelector = (store) => store.tasksReduser.tasksEdited;
