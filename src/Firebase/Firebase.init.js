// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaKzguePgiigFwUhORYp9jSyzKqewSwIo",
  authDomain: "nid-taks.firebaseapp.com",
  projectId: "nid-taks",
  storageBucket: "nid-taks.firebasestorage.app",
  messagingSenderId: "333092137304",
  appId: "1:333092137304:web:8b7db7e4cb8dc540df9d2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);