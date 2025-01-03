import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCg5eC9WKqnuelNaMXwfx6hbc6hBZ0sU8g",
  authDomain: "garbagego-3d3bb.firebaseapp.com",
  databaseURL:
    "https://garbagego-3d3bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "garbagego-3d3bb",
  storageBucket: "garbagego-3d3bb.firebasestorage.app",
  messagingSenderId: "968405033956",
  appId: "1:968405033956:web:dcca43e233310968d0ddf1",
  measurementId: "G-22F3VZ2DND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const RTDB = getDatabase(app);

export { RTDB };
