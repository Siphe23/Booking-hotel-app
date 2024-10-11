import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentInfo: null, // Store payment information
    error: null, // Store error message if needed
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentInfo: (state, action) => {
            state.paymentInfo = action.payload; // Set payment information
        },
        clearPaymentInfo: (state) => {
            state.paymentInfo = null; // Clear payment information
        },
        setPaymentError: (state, action) => {
            state.error = action.payload; // Set error message
        },
        clearPaymentError: (state) => {
            state.error = null; // Clear error message
        },
    },
});

// Export the actions
export const {
    setPaymentInfo,
    clearPaymentInfo,
    setPaymentError,
    clearPaymentError,
} = paymentSlice.actions;

// Export the reducer
export default paymentSlice.reducer;
