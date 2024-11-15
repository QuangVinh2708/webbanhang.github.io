// Database.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, get, update, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

class Database {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getDatabase(this.app);
  }

  getUserData(userId) {
    const dbRef = ref(this.db);
    return get(child(dbRef, `User/${userId}`));
  }

  updateUser(userId, userData) {
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    return update(ref(this.db, `User/${userId}`), {
      ...userData,
      UpdateDate: formattedDate
    });
  }
}

export default new Database();
