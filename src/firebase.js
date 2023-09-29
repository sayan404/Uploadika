import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvM4e3w3vmeuUHD1Le4L1gaC5kTBmrB5A",
  authDomain: "uploadika-b352f.firebaseapp.com",
  projectId: "uploadika-b352f",
  storageBucket: "uploadika-b352f.appspot.com",
  messagingSenderId: "983654269164",
  appId: "1:983654269164:web:7a6ebed74a92070bdc65c9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);
