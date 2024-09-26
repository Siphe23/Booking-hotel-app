import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../Actions/actionTypes';
import { auth } from '../Firebase/firebase'; // Make sure the path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, role) => ({
  type: LOGIN_SUCCESS,
  payload: { user, role },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      // Use Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Extract only necessary user properties
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName, // optional
        photoURL: user.photoURL, // optional
      };

      // Here, you may want to retrieve user role from Firestore if needed
      const role = "user"; // Default role, modify this as per your logic

      dispatch(loginSuccess(userData, role));
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
    }
  };
};
