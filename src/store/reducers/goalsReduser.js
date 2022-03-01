import { createReducer } from '@reduxjs/toolkit';
import { createGoals } from '../actions/goals';

const initialState = {
  water: null,
  powerTraining: null,
  cardioTraining: null,
  steps: null,
};

export const goalsReduser = createReducer(initialState, (builder) => {
  builder.addCase(createGoals, (state, action) => {
    state.water = action.payload.water;
    state.powerTraining = action.payload.powerTraining;
    state.cardioTraining = action.payload.cardioTraining;
    state.steps = action.payload.steps;
  });
});
