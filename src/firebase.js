
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,signOut} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOeI78nslr2zU1jKvsw00ADog9LNGeG6g",
  authDomain: "proyectoreact-c0491.firebaseapp.com",
  projectId: "proyectoreact-c0491",
  storageBucket: "proyectoreact-c0491.firebasestorage.app",
  messagingSenderId: "980441619393",
  appId: "1:980441619393:web:4e0c9c039ab23edc766d40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
//firestore
const db = getFirestore(app)
export {auth, googleProvider, db, signOut};