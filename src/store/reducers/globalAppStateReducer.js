import { createReducer } from '@reduxjs/toolkit';
import { gotApiError, gotStatusCode } from '../actions/globalAppStateAction';

const initialState = {
  errors: {},
};
export const globalAppStateReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(gotApiError, (state, action) => {
      state.errors.apiError = action.payload;
      state.errors.date = Date.now();
    })
    .addCase(gotStatusCode, (state, action) => {
      state.errors.statusCode = action.payload;
    });
});
