import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../Actions/actionTypes';
import axios from 'axios';


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
   
      const response = await axios.post('/api/login', { email, password });
      const { user, role } = response.data;

      dispatch(loginSuccess(user, role));
    } catch (error) {
      dispatch(loginFailure(error.response.data.message || 'Login failed'));
    }
  };
};
