import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from '../redux/hotelSlice'; // Ensure this import is correct
import paymentReducer from '../redux/hotelSlice'; // Import the payment reducer

const store = configureStore({
    reducer: {
        hotels: hotelReducer,
        payment: paymentReducer, // Add the payment reducer here
        // Other reducers can be added here
    },
});

export default store;
