import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../Actions/actionTypes";
import { auth } from '../Firebase/firebase'; // Correctly import the auth service
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      },
    });

    // Store the token in localStorage
    const token = await user.getIdToken();
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Register action
export const register = (email, password, username) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: username });
    
    const user = userCredential.user;

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      },
    });

    const token = await user.getIdToken();
    localStorage.setItem('token', token);
    
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message,
    });
  }
};