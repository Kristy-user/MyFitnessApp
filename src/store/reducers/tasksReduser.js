import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  completeTask,
  editTask,
  loadingTaskList,
  newTask,
  removeTask,
} from '../actions/tasks';

const initialState = {
  tasksList: [],
  tasksEdited: false,
};

export const tasksReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingTaskList, (state, action) => {
      state.tasksList = action.payload;
    })
    .addCase(removeTask, (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload
      );
    })
    .addCase(completeTask, (state, action) => {
      state.tasksList = state.tasksList.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      });
    })
    .addCase(newTask, (state, action) => {
      state.tasksList = [...state.tasksList, action.payload];
    })
    .addMatcher(
      () => {},
      (state, action) => {
        state.tasksEdited = true;
      }
    );
});
