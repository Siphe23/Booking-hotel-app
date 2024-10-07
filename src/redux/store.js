// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assuming you have this
import hotelReducer from './hotelSlice'; // Hotel slice for rooms

const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state
    hotels: hotelReducer, // Hotel state
  },
});

export default store;
