// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


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

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6LcIL94qAAAAAFYFThJqmuNxxGZA907IaSuzLq6N'),
  
    
//     isTokenAutoRefreshEnabled: true
//   });


export { auth };

