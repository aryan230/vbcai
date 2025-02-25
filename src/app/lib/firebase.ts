import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWZ70dSB0nEnvly15ZWVGwyjDKp7vIYJs",
  authDomain: "vbcai-52c1f.firebaseapp.com",
  projectId: "vbcai-52c1f",
  storageBucket: "vbcai-52c1f.firebasestorage.app",
  messagingSenderId: "267002688291",
  appId: "1:267002688291:web:42ee2a1ce033653ac91296",
  measurementId: "G-GHQSCFPZDW",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
