import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import hotelReducer from './hotelSlice'; 
import paymentReducer from './paymentSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer, 
    payment: paymentReducer, 
  },
});

export default store;
