import { createReducer, isAsyncThunkAction } from '@reduxjs/toolkit';
import {
  loadingUserAvatar,
  loadingUserPersonalData,
  removeUserAvatar,
  removeUserPersonalData,
  setUserAvatar,
  setUserPersonalData,
} from '../actions/userPersonalData';

const initialState = {
  userPersonalData: [],
  userAvatar: [],
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
      })
      .addCase(loadingUserAvatar, (state, action) => {
        state.userAvatar = action.payload;
      })
      .addCase(removeUserAvatar, (state, action) => {
        state.userAvatar = state.userAvatar.filter(
          (data) => data.id !== action.payload
        );
      })
      .addCase(setUserAvatar, (state, action) => {
        state.userAvatar = [...state.userAvatar, action.payload];
      });
  }
);
