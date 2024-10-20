// redux/hotelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

export const fetchRooms = createAsyncThunk('hotels/fetchRooms', async () => {
    const roomCollection = collection(db, 'rooms'); // 'rooms' is your Firestore collection name
    const roomSnapshot = await getDocs(roomCollection);
    const roomList = roomSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return roomList;
});

const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.loading = false;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default hotelSlice.reducer;


