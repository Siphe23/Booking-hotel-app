// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './hotelSlice'; 
import paymentReducer from './paymentSlice'; 

const store = configureStore({
    reducer: {
        hotel: hotelReducer,  // Your hotel reducer
        payment: paymentReducer // Your payment reducer
    },
});

export default store;



