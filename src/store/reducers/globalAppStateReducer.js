import { createReducer } from '@reduxjs/toolkit';
import { clearApiError, gotApiError } from '../actions/globalAppStateAction';

const initialState = {
  errors: [],
};
export const globalAppStateReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(gotApiError, (state, action) => {
      state.errors = [...state.errors, action.payload];
    })
    .addCase(clearApiError, (state, action) => {
      state.errors.length = 0;
    });
});
