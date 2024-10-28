import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Existing thunks
export const fetchReservationsFromFirestore = createAsyncThunk(
  'hotel/fetchReservations',
  async () => {
    const db = getFirestore();
    const reservationsCollection = collection(db, 'booked');
    const snapshot = await getDocs(reservationsCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

export const fetchBookedHotelsFromFirestore = createAsyncThunk(
  'hotel/fetchBookedHotels',
  async () => {
    const db = getFirestore();
    const bookedHotelsCollection = collection(db, 'bookedHotels');
    const snapshot = await getDocs(bookedHotelsCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

// New thunk for fetching rooms
export const fetchRoomsFromFirestore = createAsyncThunk(
  'hotel/fetchRooms',
  async () => {
    const db = getFirestore();
    const roomsCollection = collection(db, 'rooms'); // Adjust as necessary
    const snapshot = await getDocs(roomsCollection);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

// Existing thunk for adding a room
export const addRoomToFirestore = createAsyncThunk(
  'hotel/addRoom',
  async (roomDetails) => {
    const db = getFirestore();
    const roomsCollection = collection(db, 'rooms');
    const docRef = await addDoc(roomsCollection, roomDetails);
    return { id: docRef.id, ...roomDetails };
  }
);

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    reservations: [],
    bookedHotels: [],
    rooms: [],
    loading: false,
    error: null,
    addRoomLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsFromFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationsFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservationsFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBookedHotelsFromFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookedHotelsFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedHotels = action.payload;
      })
      .addCase(fetchBookedHotelsFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRoomsFromFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRoomsFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRoomToFirestore.pending, (state) => {
        state.addRoomLoading = true;
        state.error = null;
      })
      .addCase(addRoomToFirestore.fulfilled, (state, action) => {
        state.addRoomLoading = false;
        state.rooms.push(action.payload);
      })
      .addCase(addRoomToFirestore.rejected, (state, action) => {
        state.addRoomLoading = false;
        state.error = action.error.message;
      });
  },
});

// No need to re-export the functions if they're already exported at the top
export default hotelSlice.reducer; // Export the reducer as default
