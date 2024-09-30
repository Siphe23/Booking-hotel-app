
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; 
import hotelReducer from '../redux/hotelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
  },
});

export default store;