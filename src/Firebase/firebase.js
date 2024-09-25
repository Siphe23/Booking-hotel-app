// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmrpgzH3XkoS_08yJ99eL1Hn3AJPmkIa8",
  authDomain: "booking-hotel-app-ea196.firebaseapp.com",
  projectId: "booking-hotel-app-ea196",
  storageBucket: "booking-hotel-app-ea196.appspot.com",
  messagingSenderId: "318234002060",
  appId: "1:318234002060:web:cd3df551828a813d2d71a9",
  measurementId: "G-FS9K6BMCCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Cloud Storage

export { auth, db, storage };
