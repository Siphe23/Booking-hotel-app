import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Fetch rooms from Firestore
export const fetchRooms = createAsyncThunk('hotels/fetchRooms', async () => {
    const roomsCollection = collection(db, 'rooms');
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return roomList;
});

// Add a new room to Firestore
export const addRoom = createAsyncThunk('hotels/addRoom', async (roomData) => {
    const docRef = await addDoc(collection(db, 'rooms'), roomData);
    return { id: docRef.id, ...roomData };
});

// Update room in Firestore
export const updateRoom = createAsyncThunk('hotels/updateRoom', async ({ id, updatedRoomData }) => {
    const roomRef = doc(db, 'rooms', id);
    await updateDoc(roomRef, updatedRoomData);
    return { id, ...updatedRoomData };
});

// Delete room from Firestore
export const deleteRoom = createAsyncThunk('hotels/deleteRoom', async (id) => {
    const roomRef = doc(db, 'rooms', id);
    await deleteDoc(roomRef);
    return id;
});

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

export default hotelSlice.reducer;

