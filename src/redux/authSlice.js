import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userRole: null, // 'admin' or 'user'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.userRole = action.payload.role; // role should be 'admin' or 'user'
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userRole = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
