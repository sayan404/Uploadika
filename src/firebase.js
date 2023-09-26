// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwJ4AmFYr2LBa52fXvNOhTOBQS5VIDRVw",
  authDomain: "uploadika.firebaseapp.com",
  projectId: "uploadika",
  storageBucket: "uploadika.appspot.com",
  messagingSenderId: "11381260474",
  appId: "1:11381260474:web:2f5761529db091c0db8283",
  measurementId: "G-E3RCDFV05N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)