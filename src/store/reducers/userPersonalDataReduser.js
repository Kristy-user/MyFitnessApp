import { createReducer, isAsyncThunkAction } from '@reduxjs/toolkit';
import {
  loadingUserPersonalData,
  removeUserPersonalData,
  setUserPersonalData,
} from '../actions/userPersonalData';

const initialState = {
  userPersonalData: [],
};

export const userPersonalDataReduser = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(loadingUserPersonalData, (state, action) => {
        state.userPersonalData = action.payload;
      })
      .addCase(setUserPersonalData, (state, action) => {
        state.userPersonalData = [...state.userPersonalData, action.payload];
      })
      .addCase(removeUserPersonalData, (state, action) => {
        state.userPersonalData = state.userPersonalData.filter(
          (data) => data.id !== action.payload
        );
      });
  }
);
