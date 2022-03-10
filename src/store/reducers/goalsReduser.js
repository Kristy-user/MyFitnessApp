import { createReducer } from '@reduxjs/toolkit';
import { createGoals, editGoal, loadingUserGoals } from '../actions/goals';

const initialState = {
  water: null,
  powerTraining: null,
  cardioTraining: null,
  steps: null,
  weight: null,
  isEdited: false,
};

export const goalsReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(createGoals, (state, action) => {
      state.water = action.payload.water;
      state.powerTraining = action.payload.powerTraining;
      state.cardioTraining = action.payload.cardioTraining;
      state.weight = action.payload.weight;
    })
    .addCase(loadingUserGoals, (state, action) => {
      state.water = action.payload.water;
      state.powerTraining = action.payload.powerTraining;
      state.cardioTraining = action.payload.cardioTraining;
      state.steps = action.payload.steps;
      state.weight = action.payload.weight;
    })
    .addCase(editGoal, (state, action) => {
      state.isEdited = action.payload;
    });
});
