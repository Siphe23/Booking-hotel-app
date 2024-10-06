<<<<<<< HEAD
// /shared/Actions/authActions.js
=======
// src/redux/authActions.js

>>>>>>> f4b5e83 (added new files)
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './actionTypes';
<<<<<<< HEAD
import { auth } from '../Firebase/firebase';
=======
import { auth } from '../Firebase/firebase'; // Correctly import the auth service
>>>>>>> f4b5e83 (added new files)
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login, setError } from './authSlice'; // Import actions from authSlice

// Login action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    dispatch(login({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }));

    // Store the token in localStorage
    const token = await user.getIdToken();
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch(setError(error.message)); // Handle error
  }
};

// Register action
export const registerUser = (email, password, username) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    
    const user = userCredential.user;

    dispatch(login({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }));

    const token = await user.getIdToken();
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch(setError(error.message)); // Handle error
  }
};
