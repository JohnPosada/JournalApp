// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBT6dsgXhY29EwY0qGkXmoRJ6K6c5QTfAA",
  authDomain: "react-ecf74.firebaseapp.com",
  projectId: "react-ecf74",
  storageBucket: "react-ecf74.appspot.com",
  messagingSenderId: "195441058984",
  appId: "1:195441058984:web:82111980d2f5341f700e9d",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
