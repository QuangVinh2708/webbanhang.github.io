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


// let listProductHTML = document.querySelector('.listProduct');
let listProductHTML = document.getElementById('listProduct');



// function RetData(){
    
//     const dbref = ref(db);
//     get(child(dbref, 'Product')).then(function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var value = childSnapshot.val();
//             // console.log(value);
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.dataset.id = value.ProductID;

//             // let imagesHtml = '';
//             // for (let key in value.Images) {
//             //     if (value.Images.hasOwnProperty(key)) {
//             //         let imgURL = value.Images[key].ImgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//             //         imagesHtml += `<img class="card-img-top" src="${imgURL}" alt="${value.Name}">`;
//             //     }
//             // }

//              let imagesHtml = '';
//             // if (value.Images) {
//             //     Object.keys(value.Images).forEach(function(key) {
//             //         let imgURL = value.Images[key].ImgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//             //         imagesHtml += `<img class="card-img-top" src="${imgURL}" alt="${value.Name}">`;
//             //     });
//             // }

//             if (value.Images) {
//                 const firstImageKey = Object.keys(value.Images)[0];
//                 if (firstImageKey) {
//                     let imgURL = value.Images[firstImageKey].ImgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//                     imagesHtml = `<img class="card-img-top" src="${imgURL}" alt="${value.Name}">`;
//                 }
//             }
            

//             newProduct.innerHTML =  `
//                 <a href="detail.html?id=${value.ProductID}" class="img-responsive-wrap">
//                     ${imagesHtml}
//                 </a>
//                 <h2>${value.Name}</h2>
//                 <div class="price">${value.Price}đ</div>
//                 <button class="addCart">
//                     Thêm vào giỏ hàng
//                 </button>
                
//             `;
//             //console.log(value.Caterogy);
//             listProductHTML.appendChild(newProduct);
//         });
//     })
//     .catch((error)=>{
//         alert("Unsuccessful");
//         console.log(error);
//     });
// }

function RetData(){
    const dbref = ref(db);
    get(child(dbref, 'Product')).then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var value = childSnapshot.val();
            
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = value.ProductID;

            let imagesHtml = '';
            if (value.Images) {
                const firstImageKey = Object.keys(value.Images)[0];
                if (firstImageKey) {
                    let imgURL = value.Images[firstImageKey].ImgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    // Add the default class to the img tag
                    imagesHtml = `<img style="width: 230px;height: 350px;object-fit:cover" class="card-img-top img-default" src="${imgURL}" alt="${value.Name}">`;
                }
            }

            newProduct.innerHTML =  `
                <a href="detail.html?id=${value.ProductID}" >
                    ${imagesHtml}
                </a>
                <h2>${value.Name}</h2>
                <div class="price">${value.Price}đ</div>
                <button class="addCart">
                    Thêm vào giỏ hàng
                </button>
            `;
            
            listProductHTML.appendChild(newProduct);
        });
    })
    .catch((error)=>{
        alert("Unsuccessful");
        console.log(error);
    });
}

RetData();






// const addDataToHTML = () => {
//     listProductHTML.innerHTML = "";
//     if(listProducts.length >0){
//         listProducts.forEach (product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.dataset.id = product.id;
//             newProduct.innerHTML =  `
//                 <img class="card-img-top " src="${product.image}" alt="">
//                 <h2>${NamePro}</h2>
//                 <div class="price">${product.price}</div>
//                 <button class="addCart">
//                     Thêm vào giỏ hàng
//                 </button>
//             `;
//             listProductHTML.appendChild(newProduct);
//         })
//     }
// }

