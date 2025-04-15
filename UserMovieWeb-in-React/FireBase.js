// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUCFkZZiElC2KOExN6JCZERSn22VP68M",
  authDomain: "movie-mangagement.firebaseapp.com",
  projectId: "movie-mangagement",
  storageBucket: "movie-mangagement.firebasestorage.app",
  messagingSenderId: "371027251710",
  appId: "1:371027251710:web:e6acf2419319ac7b3d70af",
  measurementId: "G-P505HXCPB9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();