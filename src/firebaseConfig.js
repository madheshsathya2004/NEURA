// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { disableNetwork} from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUVj4L04_fl1dkUz35ZKbd1pN0Gy90FUs",
  authDomain: "neura-81d4b.firebaseapp.com",
  projectId: "neura-81d4b",
  storageBucket: "neura-81d4b.firebasestorage.app",
  messagingSenderId: "257782386238",
  appId: "1:257782386238:web:21210e13fcce30d7f44b6f",
  measurementId: "G-YVQWXKECCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);  // For Firebase Authentication
const db = getFirestore(app);  // For Firestore


export { auth, db };  