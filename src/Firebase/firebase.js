// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Auth
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB35zqc99O83jS6NZHsYXFpL8wOQ3djxRg",
  authDomain: "hotel-booking-app-a083a.firebaseapp.com",
  projectId: "hotel-booking-app-a083a",
  storageBucket: "hotel-booking-app-a083a.appspot.com",
  messagingSenderId: "386005281931",
  appId: "1:386005281931:web:6b9927b8ec93d56541b88e",
  measurementId: "G-Z5L7RFEZ5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: Remove if not needed
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth
const storage = getStorage(app); // Initialize Storage

// Export initialized Firebase app, Firestore, Auth, and Storage

export { app, db, auth, storage };
