import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, set, runTransaction, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
class User{
    constructor(userID, address, birth, email, fullName, phone, role){
        this.firebaseConfig = {
            apiKey: "AIzaSyCDPGzN9HKCKraCgX3HvsNj6hWSRCn4H28",
            authDomain: "dvpmovie.firebaseapp.com",
            databaseURL: "https://dvpmovie-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "dvpmovie",
            storageBucket: "dvpmovie.appspot.com",
            messagingSenderId: "721645459692",
            appId: "1:721645459692:web:89b0bfeab85666bd552dc9",
            measurementId: "G-HXKG7H6LTV"
        };
        this.app = initializeApp(this.firebaseConfig);
        this.db = getDatabase();
    }
    addUser(){
        const dbref = ref(this.db);
        set(child(dbref, 'User/' + this.id), {
            Name: this.name,
            Email: this.email,
            Role: this.role,
            Phone: this.phone
        }).then(() => {
            console.log("User added successfully");
        }).catch((error) => {
            console.error("Error adding user:", error);
        });
    }
    removeUser(){
        const dbref = ref(this.db);
        remove(child(dbref, 'User/' + this.id)).then(() => {
            console.log("User removed successfully");
        }).catch((error) => {
            console.error("Error removing user:", error);
        });
    }
    updateUser(){
        const dbref = ref(this.db);
        update(child(dbref, 'User/' + this.id), {
            Name: this.name,
            Email: this.email,
            Role: this.role,
            Phone: this.phone
        }).then(() => {
            console.log("User updated successfully");
        }).catch((error) => {
            console.error("Error updating user:", error);
        });
    }
}