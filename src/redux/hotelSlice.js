// src/redux/hotelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch hotel rooms
export const fetchRooms = createAsyncThunk('hotels/fetchRooms', async () => {
    const response = await fetch('https://api.example.com/hotel-rooms'); // Replace with your actual API endpoint
    const data = await response.json();
    return data.rooms; // Ensure this matches your API response structure
});

const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setRooms } = hotelSlice.actions;
export default hotelSlice.reducer;
