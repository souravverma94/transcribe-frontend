import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBlYrhlHh5WAJ6zLKcpUbh9aRMtM_aez0",
  authDomain: "auto-transcribe-c8043.firebaseapp.com",
  databaseURL: "https://auto-transcribe-c8043-default-rtdb.firebaseio.com",
  projectId: "auto-transcribe-c8043",
  storageBucket: "auto-transcribe-c8043.appspot.com",
  messagingSenderId: "1063509017126",
  appId: "1:1063509017126:web:e5e20fc8d46e8eca079ce7",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
