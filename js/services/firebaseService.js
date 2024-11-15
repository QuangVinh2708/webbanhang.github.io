import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get, update, remove, set, child, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase(app);

class FirebaseService {
    static getAuth() {
        return auth;
    }

    static getDatabase() {
        return db;
    }

    static getRef(path) {
        return ref(db, path);
    }

    static async getData(ref) {
        return await get(ref);
    }

    static async updateData(ref, data) {
        if (typeof data !== 'object' || data === null) {
            throw new Error("Data argument must be a non-null object.");
        }
        return await update(ref, data);
    }
    

    static async removeData(ref) {
        return await remove(ref);
    }

    static async setData(ref, data) {
        return await set(ref, data);
    }

    static async pushData(ref, data) {
        const newRef = push(ref);
        return await set(newRef, data);
    }

    static onAuthStateChanged(callback) {
        onAuthStateChanged(auth, callback);
    }
}

export default FirebaseService;
