import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userRole: null, 
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userRole = action.payload.role; 
            state.user = action.payload.user;
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userRole = null;
            state.user = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});


export const { login, logout, setError } = authSlice.actions;


export default authSlice.reducer;
