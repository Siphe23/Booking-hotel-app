// Import the necessary functions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase'; // Ensure this imports the correct Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Fetch rooms from Firestore
export const fetchRoomsFromFirestore = createAsyncThunk('hotels/fetchRooms', async () => {
    const roomsCollection = collection(db, 'rooms');
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return roomList;
});

// ... other actions like addRoomToFirestore

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
            .addCase(fetchRoomsFromFirestore.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status = 'succeeded'; // Set the status to succeeded
            })
            .addCase(fetchRoomsFromFirestore.pending, (state) => {
                state.status = 'loading'; // Set the status to loading
            })
            .addCase(fetchRoomsFromFirestore.rejected, (state, action) => {
                state.status = 'failed'; // Set the status to failed
                state.error = action.error.message; // Capture error message
            })
            // ... other extra reducers
    },
});

export default hotelSlice.reducer; // Export the reducer as default
