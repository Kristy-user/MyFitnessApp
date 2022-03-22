import { createReducer } from '@reduxjs/toolkit';
import {
  editUserPersonalData,
  setUserPersonalData,
} from '../actions/userPersonalData';

const initialState = {
  name: null,
  surname: null,
  age: null,
  height: null,
  weight: null,
  isCreated: false,
};

export const userPersonalDataReduser = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setUserPersonalData, (state, action) => {
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.age = action.payload.age;
        state.height = action.payload.height;
        state.weight = action.payload.weight;
      })
      .addCase(editUserPersonalData, (state, action) => {
        state.isCreated = true;
      });
  }
);
