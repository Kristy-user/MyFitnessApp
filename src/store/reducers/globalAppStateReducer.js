import { createReducer } from '@reduxjs/toolkit';
import { gotApiError, gotStatusCode } from '../actions/globalAppStateAction';
const initialState = {
  APIerror: '',
  statusCode: null,
};
export const globalAppStateReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(gotApiError, (state, action) => {
      state.APIerror = action.payload;
    })
    .addCase(gotStatusCode, (state, action) => {
      state.statusCode = action.payload;
    });
});
