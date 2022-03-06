import { createReducer } from '@reduxjs/toolkit';
import { createGoals, editGoal, loadingUserGoals } from '../actions/goals';

const initialState = {
  water: null,
  powerTraining: null,
  cardioTraining: null,
  steps: null,
};

export const goalsReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(createGoals, (state, action) => {
      state.water = action.payload.water;
      state.powerTraining = action.payload.powerTraining;
      state.cardioTraining = action.payload.cardioTraining;
      state.steps = action.payload.steps;
    })
    .addCase(loadingUserGoals, (state, action) => {
      state.water = action.payload.water;
      state.powerTraining = action.payload.powerTraining;
      state.cardioTraining = action.payload.cardioTraining;
      state.steps = action.payload.steps;
    })
    .addCase(editGoal, (state, action) => {
      state.action.payload.goal = action.payload.value;
    });
});
