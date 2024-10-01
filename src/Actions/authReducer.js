// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set the user data on successful login
      state.error = null;
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
});

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;
