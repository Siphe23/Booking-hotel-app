import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Your existing auth slice
import hotelReducer from './hotelSlice'; // The new hotel slice
import paymentReducer from './paymentSlice'; // Import the payment slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer, // Add the hotel reducer here
    payment: paymentReducer, // Add the payment reducer here
  },
});

export default store;
