import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBzXM7RD4mzEpG1k768iOKnBQHhedk7rF0",
    authDomain: "ticketing-system-2da65.firebaseapp.com",
    projectId: "ticketing-system-2da65",
    storageBucket: "ticketing-system-2da65.firebasestorage.app",
    messagingSenderId: "730229134185",
    appId: "1:730229134185:web:5266e3ab4709e93a15a3f8",
    measurementId: "G-X4VD50HE67"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)