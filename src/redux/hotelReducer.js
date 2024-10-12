import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};
const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
   
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { setRooms, setLoading, setError } = hotelSlice.actions;


export default hotelSlice.reducer;
