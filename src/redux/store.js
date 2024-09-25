// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; // Update with the correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
