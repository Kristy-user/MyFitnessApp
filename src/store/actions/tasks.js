import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTaskList = createAction('LoadingTaskList');
export const removeTaskStart = createAction('RemoveTaskStart');
export const removeTaskSuccess = createAction('RemoveTaskSuccess');
export const completeTask = createAction('CompleteTask');

export const newTaskSuccess = createAction('AddTaskSuccess');

export const removeTask = (id) => {
  return (dispatch) => {
    // dispatch(removeTaskStart(id));
    fakeServerAPI
      .delete(`/tasks/${id}`)
      .then(() => dispatch(removeTaskSuccess(id)));
  };
};

export const newTask = (task, userId) => {
  return (dispatch) => {
    fakeServerAPI
      .post(`/tasks`, {
        userId: userId,
        date: task.date,
        title: task.title,
        completed: false,
      })

      .then((response) =>
        dispatch(
          newTaskSuccess({
            userId: userId,
            date: task.date,
            title: task.title,
            id: response.data.id,
            completed: false,
          })
        )
      );
  };
};
