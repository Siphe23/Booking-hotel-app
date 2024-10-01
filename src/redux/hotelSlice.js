// src/redux/hotelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    rooms: [], // Initialize rooms as an empty array
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload; // Update rooms with the payload
    },
  },
});

export const { setRooms } = hotelSlice.actions;

export default hotelSlice.reducer;
