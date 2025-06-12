import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOfmOyijrPXd-eAJBlNtyYYtYJVgbrgeY",
  authDomain: "ciraluxe.firebaseapp.com",
  projectId: "ciraluxe",
  storageBucket: "ciraluxe.appspot.com", // Fixed
  messagingSenderId: "90481676094",
  appId: "1:90481676094:web:94c7aa06ca6ed93092a66f",
  measurementId: "G-WM0ECLFGV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firestore
export const firestore = getFirestore(app);
export { app };
