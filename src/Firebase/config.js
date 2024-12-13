// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBKdPDdzQEcB47tHa96L4HJ-EBfG6eZUfQ",
  authDomain: "fusion-2e6d3.firebaseapp.com",
  databaseURL: "https://fusion-2e6d3-default-rtdb.firebaseio.com",
  projectId: "fusion-2e6d3",
  storageBucket: "fusion-2e6d3.firebasestorage.app",
  messagingSenderId: "268211920944",
  appId: "1:268211920944:web:81047b6d3fcaff78a50df5",
  measurementId: "G-VEKF1Y2QE0",
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);

export default cong;
