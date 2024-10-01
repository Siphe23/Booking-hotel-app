// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; // Adjust based on your actual auth reducer path
import hotelReducer from '../redux/hotelSlice'; // Correct the path if necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
  },
});

export default store;

