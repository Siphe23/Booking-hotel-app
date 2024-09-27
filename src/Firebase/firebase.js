
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyB35zqc99O83jS6NZHsYXFpL8wOQ3djxRg",
  authDomain: "hotel-booking-app-a083a.firebaseapp.com",
  projectId: "hotel-booking-app-a083a",
  storageBucket: "hotel-booking-app-a083a.appspot.com",
  messagingSenderId: "386005281931",
  appId: "1:386005281931:web:6b9927b8ec93d56541b88e",
  measurementId: "G-Z5L7RFEZ5X"
};


const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app);

const analytics = getAnalytics(app); 
console.log("Firebase Analytics initialized:", analytics);

const db = getFirestore(app);
console.log("Firestore initialized:", db);

const auth = getAuth(app); 
console.log("Firebase Auth initialized:", auth);

const storage = getStorage(app); 
console.log("Firebase Storage initialized:", storage);

export { app, db, auth, storage };

