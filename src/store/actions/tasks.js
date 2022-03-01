import { createAction } from '@reduxjs/toolkit';
import fakeServerAPI from '../../api/fakeServerAPI';

export const loadingTaskList = createAction('LoadingTaskList');
export const removeTaskStart = createAction('RemoveTaskStart');
export const removeTaskSuccess = createAction('RemoveTaskSuccess');
export const completeTask = createAction('CompleteTask');

export const newTaskSuccess = createAction('AddTaskSuccess');

export const removeTask = (id) => {
  return (dispatch) => {
    dispatch(removeTaskStart(id));
    fakeServerAPI
      .delete(`/tasks/${id}`)
      .then(() => dispatch(removeTaskSuccess(id)));
  };
};

export const newTask = (task) => {
  return (dispatch) => {
    console.log(task);
    fakeServerAPI
      .post(`/tasks`, task)
      .then(() => dispatch(newTaskSuccess(task)));
  };
};
