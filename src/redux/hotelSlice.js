
import { createSlice } from '@reduxjs/toolkit';

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    rooms: [], 
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload; 
    },
  },
});

export const { setRooms } = hotelSlice.actions;

export default hotelSlice.reducer;
