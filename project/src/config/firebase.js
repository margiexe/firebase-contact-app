// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "vite-contact-ce963.firebaseapp.com",
  projectId: "vite-contact-ce963",
  storageBucket: "vite-contact-ce963.appspot.com",
  messagingSenderId: "371316818880",
  appId: "API_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
