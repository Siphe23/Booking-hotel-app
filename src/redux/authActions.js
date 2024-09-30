
import { auth, db } from '../Firebase/firebase';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });


    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

   
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, role: userData.role } });
  } catch (error) {
  
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};