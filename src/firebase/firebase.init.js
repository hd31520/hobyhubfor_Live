// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_DB_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_DB_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_DB_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_DB_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_DB_FIREBASE_MESSIONGSENDINGID,
  appId:import.meta.env.VITE_DB_FIREBASE_APPID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
 export  const auth = getAuth(app);