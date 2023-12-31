import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://wn-pwa-default-rtdb.firebaseio.com",
  projectId: "wn-pwa",
  storageBucket: "wn-pwa.appspot.com",
  messagingSenderId: "15906840472",
  appId: "1:15906840472:web:ecef428ad05d29b427d5ed",
};

initializeApp(firebaseConfig);

export const db = getDatabase();
export const auth = getAuth();
