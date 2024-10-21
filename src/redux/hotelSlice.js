import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase'; // Ensure this imports the correct Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Fetch rooms from Firestore
export const fetchRooms = createAsyncThunk('hotels/fetchRooms', async () => {
    const roomsCollection = collection(db, 'rooms');
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    name: 'hotels',
    initialState: {
        rooms: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                const index = state.rooms.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter((room) => room.id !== action.payload);
            });
    },
});

// Only export the reducer
export default hotelSlice.reducer;

