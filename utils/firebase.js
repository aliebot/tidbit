// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKywqKLdHgM9mqPLLsU8LAMtrlxa89bPU",
  authDomain: "tidbit-8a75e.firebaseapp.com",
  projectId: "tidbit-8a75e",
  storageBucket: "tidbit-8a75e.appspot.com",
  messagingSenderId: "88920828848",
  appId: "1:88920828848:web:38a42de79753e8fdefc475",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
