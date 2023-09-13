import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'wn-pwa',
  storageBucket: 'wn-pwa.appspot.com',
  messagingSenderId: '15906840472',
  appId: '1:15906840472:web:ecef428ad05d29b427d5ed',
};

initializeApp(firebaseConfig);
