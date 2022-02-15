import { createReducer } from '@reduxjs/toolkit';
import {
  loadingAllExercises,
  loadingExercisesList,
} from '../actions/exercises';

const initialState = {
  exercisesList: [],
  allExercises: [],
};

export const exercisesReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingExercisesList, (state, action) => {
      state.exercisesList = action.payload;
    })
    .addCase(loadingAllExercises, (state, action) => {
      state.allExercises = action.payload;
    });
});
