// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firebase Firestore (Database)
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

// Initialize Firebase services (auth and Firestore)
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firebase Firestore (Database)

// Export the auth and db services so you can use them in other files
export { auth, db };


