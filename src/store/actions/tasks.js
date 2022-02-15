import { createAction } from '@reduxjs/toolkit';

export const loadingTaskList = createAction('LoadingTaskList');

export const editTask = createAction('EditTask');
export const removeTask = createAction('RemoveTask');
export const completeTask = createAction('CompleteTask');
export const newTask = createAction('AddTask');
