import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

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

import { getDatabase, ref, get, set, runTransaction, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const db = getDatabase();




function RetData(){
    
    const dbref = ref(db);
    get(child(dbref, 'Product')).then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var value = childSnapshot.val();
            // console.log(value);
            // let newProduct = document.createElement('div');
            // newProduct.classList.add('item');
            // newProduct.dataset.id = value.ProductID;
            console.log(value.ProductID);
          //  products[value.ProductID] = value;
        });
    })
    .catch((error)=>{
        alert("Unsuccessful");
        console.log(error);
    });
}

RetData();

