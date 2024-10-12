import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentInfo: null, 
    error: null, 
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentInfo: (state, action) => {
            state.paymentInfo = action.payload; 
        },
        clearPaymentInfo: (state) => {
            state.paymentInfo = null; 
        },
        setPaymentError: (state, action) => {
            state.error = action.payload; 
        },
        clearPaymentError: (state) => {
            state.error = null; 
        },
    },
});


export const {
    setPaymentInfo,
    clearPaymentInfo,
    setPaymentError,
    clearPaymentError,
} = paymentSlice.actions;


export default paymentSlice.reducer;
