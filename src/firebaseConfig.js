// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3Nrou0MqFgYfqXt_N2sv-3LEv6IRXcF0",
  authDomain: "login-app-49478.firebaseapp.com",
  projectId: "login-app-49478",
  storageBucket: "login-app-49478.appspot.com",
  messagingSenderId: "970385125258",
  appId: "1:970385125258:web:01d5e56fddc82d52eea273",
  measurementId: "G-SCK6P567RC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// const analytics = getAnalytics(app);
