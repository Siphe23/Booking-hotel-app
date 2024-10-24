// Import necessary Firebase functions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../Firebase/firebase'; // Import Firestore and Storage instances
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fetch rooms from Firestore
export const fetchRoomsFromFirestore = createAsyncThunk('hotels/fetchRooms', async () => {
    const roomsCollection = collection(db, 'rooms');
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return roomList;
});

// Upload room image to Firebase Storage
export const uploadRoomImage = createAsyncThunk('hotels/uploadRoomImage', async ({ roomId, file }, thunkAPI) => {
    try {
        // Create a reference to the storage location for the image
        const storageRef = ref(storage, `rooms/${roomId}/${file.name}`);
        
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update the room document in Firestore with the new image URL
        const roomDoc = doc(db, 'rooms', roomId);
        await updateDoc(roomDoc, {
            imageUrl: downloadURL,
        });

        return { roomId, downloadURL };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

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
            .addCase(uploadRoomImage.fulfilled, (state, action) => {
                const { roomId, downloadURL } = action.payload;
                // Update the room in state with the new image URL
                const room = state.rooms.find((room) => room.id === roomId);
                if (room) {
                    room.imageUrl = downloadURL;
                }
            })
            .addCase(uploadRoomImage.rejected, (state, action) => {
                state.error = action.payload; // Capture image upload error
            });
    },
});

export default hotelSlice.reducer; // Export the reducer as default
