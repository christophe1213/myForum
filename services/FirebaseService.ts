// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApw-adq4FqR5mqH-ezJQTfCMmilSkr6ko",
  authDomain: "test-ff833.firebaseapp.com",
  projectId: "test-ff833",
  storageBucket: "test-ff833.firebasestorage.app",
  messagingSenderId: "716520520988",
  appId: "1:716520520988:web:79e800bbe0ac3f0c7eced9",
  measurementId: "G-DFTRLEF6FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)

