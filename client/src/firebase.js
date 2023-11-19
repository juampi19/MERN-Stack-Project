// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-39988.firebaseapp.com",
  projectId: "mern-estate-39988",
  storageBucket: "mern-estate-39988.appspot.com",
  messagingSenderId: "833831094124",
  appId: "1:833831094124:web:d133a4f8d6c0a8691bd549"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);