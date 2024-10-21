import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase'; // Ensure this imports the correct Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Thunk to fetch rooms from Firestore
export const fetchRoomsFromFirestore = createAsyncThunk(
  'rooms/fetchRooms',
  async () => {
    const roomsCol = collection(db, 'rooms'); // Use db to access Firestore
    const roomSnapshot = await getDocs(roomsCol);
    const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return roomList;
  }
);

// Thunk to add a room to Firestore
export const addRoomToFirestore = createAsyncThunk(
  'rooms/addRoom',
  async (roomData) => {
    const roomsCol = collection(db, 'rooms'); // Use db to access Firestore
    const docRef = await addDoc(roomsCol, roomData);
    return { id: docRef.id, ...roomData }; // Return the newly added room data
  }
);

// Create the hotel slice
const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    rooms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsFromFirestore.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(addRoomToFirestore.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      });
  },
});

// Only export the reducer
export default hotelSlice.reducer;

// Export the async thunks in the same statement

