import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  completeTask,
  editTask,
  loadingTaskList,
  newTask,
  newTaskSuccess,
  removeTask,
  removeTaskSuccess,
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
    .addCase(removeTaskSuccess, (state, action) => {
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
    .addCase(newTaskSuccess, (state, action) => {
      state.tasksList = [...state.tasksList, action.payload];
    });
  // .addMatcher(
  //   (action) => {
  //     return action.type == 'AddTask';
  //   },
  //   (state) => {
  //     state.tasksEdited = true;
  //   }
  // );
});
