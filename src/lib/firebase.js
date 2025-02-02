import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7_G5LkWcC3nK4pFYVH25BkFgYX0GNMLU",
  authDomain: "let-s-connect-eb608.firebaseapp.com",
  projectId: "let-s-connect-eb608",
  storageBucket: "let-s-connect-eb608.firebasestorage.app",
  messagingSenderId: "121383959635",
  appId: "1:121383959635:web:bfe421ba67d5c56b1bdaa6",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
