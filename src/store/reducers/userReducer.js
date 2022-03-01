import { createReducer } from '@reduxjs/toolkit';
import { logIn, logOut } from '../actions/user';

const initialState = {
  userName: '',
  userRoles: [],
  isLoggedIn: false,
};
export const userReduser = createReducer(initialState, (builder) => {
  builder
    .addCase(logIn, (state, action) => {
      state.userName = action.payload.userName;
      state.userRoles = action.payload.userRoles;
      state.isLoggedIn = action.payload.isLoggedIn;
    })
    .addCase(logOut, (state, action) => {
      state.userName = '';
      state.userRoles = [];
      state.isLoggedIn = false;
    });
});
