// src/redux/authActions.js

import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login, setError } from './authSlice'; // Ensure the path to authSlice is correct

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
    dispatch(setError(error.message)); // Dispatch error action
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
    dispatch(setError(error.message)); // Dispatch error action
  }
};
