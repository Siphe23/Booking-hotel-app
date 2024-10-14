import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyB35zqc99O83jS6NZHsYXFpL8wOQ3djxRg",
  authDomain: "hotel-booking-app-a083a.firebaseapp.com",
  projectId: "hotel-booking-app-a083a",
  storageBucket: "hotel-booking-app-a083a.appspot.com",
  messagingSenderId: "386005281931",
  appId: "1:386005281931:web:6e2a5b475b9383f341b88e",
  measurementId: "G-SJE0KBMDPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

export { db, auth }; // Export db and auth for use in your application
