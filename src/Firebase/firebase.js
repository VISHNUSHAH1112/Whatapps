import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw47pEjA2kc3JWttdLAlDG7T7UzUVBtnk",
  authDomain: "whatapps-eaeb2.firebaseapp.com",
  projectId: "whatapps-eaeb2",
  storageBucket: "whatapps-eaeb2.firebasestorage.app",
  messagingSenderId: "433562592369",
  appId: "1:433562592369:web:cd6190929d6e8f9950e7d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ Firestore ko "db" naam se export karo
export const db = getFirestore(app);
