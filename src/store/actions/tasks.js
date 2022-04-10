import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTaskList = createAction('LoadingTaskList');

export const removeTaskSuccess = createAction('RemoveTaskSuccess');
export const completeTask = createAction('CompleteTask');

export const newTaskSuccess = createAction('AddTaskSuccess');

export const removeTask = (id) => {
  return (dispatch) => {
    fakeServerAPI
      .delete(`/tasks/${id}`)
      .then(() => dispatch(removeTaskSuccess(id)))
      .catch((error) => error);
  };
};
export const setComplitedTask = (task) => {
  return (dispatch) => {
    fakeServerAPI
      .put(`/tasks/${task.id}`, {
        userId: task.userId,
        date: task.date,
        title: task.title,
        completed: !task.completed,
        id: task.id,
      })
      .then(() => dispatch(completeTask(task.id)))
      .catch((error) => error);
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

      .then((response) => dispatch(newTaskSuccess(response.data)))
      .catch((error) => error);
  };
};
