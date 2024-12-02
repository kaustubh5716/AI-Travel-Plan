// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOLp__JHUeDnymt1mqNfLSCwUbhgb3b90",
  authDomain: "ai-trip-planner-418f6.firebaseapp.com",
  projectId: "ai-trip-planner-418f6",
  storageBucket: "ai-trip-planner-418f6.firebasestorage.app",
  messagingSenderId: "1043501669107",
  appId: "1:1043501669107:web:8e1764b3bd42cdb10bf586",
  measurementId: "G-1KXL3GQJM5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);