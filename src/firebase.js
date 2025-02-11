// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAv5eb6I1AEY_UfX1S8r2IVOWJD0sIVFXo",
    authDomain: "swayamvara-ticket-generator.firebaseapp.com",
    projectId: "swayamvara-ticket-generator",
    storageBucket: "swayamvara-ticket-generator.firebasestorage.app",
    messagingSenderId: "586038179958",
    appId: "1:586038179958:web:195e1f3393364472c28757",
    measurementId: "G-QWX9RVZ9L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };