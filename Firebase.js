// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJTK8xYFBxLEILLlC_zicAN2MzOL9y60E",
  authDomain: "instagram-2-o.firebaseapp.com",
  projectId: "instagram-2-o",
  storageBucket: "instagram-2-o.appspot.com",
  messagingSenderId: "227295105675",
  appId: "1:227295105675:web:5b236757bc90bbc8f9fa8e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const dataBase = getFirestore();

const storage = getStorage();

export { app, dataBase, storage };
