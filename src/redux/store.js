// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Your existing auth slice
import hotelReducer from './hotelSlice'; // The new hotel slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer, // Add the hotel reducer here
  },
});

export default store;
