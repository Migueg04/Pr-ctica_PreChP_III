// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSZKGWko6LBdMKgVJA8C36IWt79J34NBU",
  authDomain: "post-app-example-8a071.firebaseapp.com",
  projectId: "post-app-example-8a071",
  storageBucket: "post-app-example-8a071.firebasestorage.app",
  messagingSenderId: "485063774647",
  appId: "1:485063774647:web:947e6ff2605550bbaad832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };