import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

// Create the hotel slice
const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    // Action to set rooms
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const { setRooms, setLoading, setError } = hotelSlice.actions;

// Export the reducer
export default hotelSlice.reducer;
