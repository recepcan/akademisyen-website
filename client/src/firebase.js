// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "yunus-altundag-website.firebaseapp.com",
    projectId: "yunus-altundag-website",
    storageBucket: "yunus-altundag-website.appspot.com",
    messagingSenderId: "602138454756",
    appId: "1:602138454756:web:6ac0f39ef347ae27c51af1"
  };
  
  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);

