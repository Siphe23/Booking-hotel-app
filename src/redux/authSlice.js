// /shared/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

<<<<<<< HEAD
const initialState = {
    isAuthenticated: false,
    userRole: null, // 'admin' or 'user'
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userRole = action.payload.role; // 'admin' or 'user'
            state.user = action.payload.user;
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userRole = null;
            state.user = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
=======
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userRole: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role; // Assuming payload includes user role
>>>>>>> f4b5e83 (added new files)
    },
    // Add more reducers as needed
  },
});

<<<<<<< HEAD
export const { login, logout, setError } = authSlice.actions;
=======
// Export actions
export const { login, setRooms } = authSlice.actions;

// Export reducer
>>>>>>> f4b5e83 (added new files)
export default authSlice.reducer;
