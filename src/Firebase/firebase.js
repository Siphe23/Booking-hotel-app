import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnj0mzqTLbx4Ysv2AYp6m2FfOVYDnFHng",
  authDomain: "booking-app-e9c1f.firebaseapp.com",
  projectId: "booking-app-e9c1f",
  storageBucket: "booking-app-e9c1f.appspot.com",
  messagingSenderId: "134173841084",
  appId: "1:134173841084:web:8c06e98d6bc06e002722b9",
  measurementId: "G-K0BE55PHLF"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); 

export { storage, auth, db }; 
