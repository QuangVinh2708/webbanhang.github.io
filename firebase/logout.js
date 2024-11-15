import  { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    signOut,
    getAuth
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyCDPGzN9HKCKraCgX3HvsNj6hWSRCn4H28",
    authDomain: "dvpmovie.firebaseapp.com",
    databaseURL: "https://dvpmovie-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dvpmovie",
    storageBucket: "dvpmovie.appspot.com",
    messagingSenderId: "721645459692",
    appId: "1:721645459692:web:89b0bfeab85666bd552dc9",
    measurementId: "G-HXKG7H6LTV"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const logout = async (path) => {
    await signOut(auth);
    console.log('Logged out')
    window.location.href = path;
}
export{
    logout,
}
