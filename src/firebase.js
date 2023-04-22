// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNqNBrai5Okm0YrcBxXauEtkeNj8UeC0E",
    authDomain: "chat-pro-726c2.firebaseapp.com",
    projectId: "chat-pro-726c2",
    storageBucket: "chat-pro-726c2.appspot.com",
    messagingSenderId: "466687500136",
    appId: "1:466687500136:web:7d80a853d68aae000d80dd"
};
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);