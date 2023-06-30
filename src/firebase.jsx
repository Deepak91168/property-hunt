import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWH_2AAQmKQyA5tzeFgKD3yOIDNQPZksY",
  authDomain: "property-hunt-91168.firebaseapp.com",
  projectId: "property-hunt-91168",
  storageBucket: "property-hunt-91168.appspot.com",
  messagingSenderId: "1020332836518",
  appId: "1:1020332836518:web:8eabbc2682dc3f8430d667",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
