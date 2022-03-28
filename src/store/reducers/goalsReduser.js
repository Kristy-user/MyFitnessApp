import { createReducer } from '@reduxjs/toolkit';
import {
  createGoals,
  editGoal,
  loadingUserGoals,
  removeUserGoals,
  showEditGoalsCard,
} from '../actions/goals';

const initialState = {
  usersGoals: [],
  showEditGoalsCard: false,
};

export const goalsReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(createGoals, (state, action) => {
      state.usersGoals = [...state.usersGoals, action.payload];
    })
    .addCase(loadingUserGoals, (state, action) => {
      state.usersGoals = action.payload;
    })
    .addCase(showEditGoalsCard, (state, action) => {
      state.showEditGoalsCard = action.payload;
    })
    .addCase(removeUserGoals, (state, action) => {
      state.usersGoals = state.usersGoals.filter(
        (data) => data.id !== action.payload
      );
    });
});
