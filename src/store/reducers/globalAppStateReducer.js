import { createReducer } from '@reduxjs/toolkit';
import { gotApiError } from '../actions/globalAppStateAction';
const initialState = {
  APIerror: '',
};
export const globalAppStateReduser = createReducer(initialState, (builder) => {
  builder.addCase(gotApiError, (state, action) => {
    state.APIerror = action.payload;
  });
});
