import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDABuHv42pISCDqgHFgD_S7oZ_JZX0z_Ek",
  authDomain: "authtest-ea283.firebaseapp.com",
  projectId: "authtest-ea283",
  storageBucket: "authtest-ea283.firebasestorage.app",
  messagingSenderId: "1065240040868",
  appId: "1:1065240040868:web:d8f6f6be0d273ca08e9d31",
  measurementId: "G-W1H4NX1NEP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);