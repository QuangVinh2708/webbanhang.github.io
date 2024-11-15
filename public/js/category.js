import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const db = getDatabase();

function fetchAndDisplayProductsByCategory(categoryId) {
    const dbRef = ref(db);
    get(child(dbRef, 'Product')).then(snapshot => {
        const productsByCategory = [];
        snapshot.forEach(childSnapshot => {
            const product = childSnapshot.val();
            if (product.CategoryID === categoryId) {
                productsByCategory.push(product);
            }
        });

        const categorySection = document.createElement('section');
        categorySection.classList.add('homepage-products', 'mb-4');
        const productListHTML = document.createElement('div');
        productListHTML.classList.add('listProduct', 'container');
        categorySection.appendChild(productListHTML);

        productsByCategory.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('item', 'card', 'align-items-center');
            newProduct.dataset.id = product.ProductID;

            let imagesHtml = '';
            if (product.Images) {
                const firstImageKey = Object.keys(product.Images)[0];
                if (firstImageKey) {
                    let imgURL = product.Images[firstImageKey].ImgURL.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    imagesHtml = `<img class="card-img-top" src="${imgURL}" alt="${product.Name}">`;
                }
            }

            newProduct.innerHTML =  `
                <a href="detail.html?id=${product.ProductID}">
                    ${imagesHtml}
                </a>
                <h2>${product.Name}</h2>
                <div class="price">${product.Price}đ</div>
                <button class="addCart">
                    Thêm vào giỏ hàng
                </button>
            `;
            productListHTML.appendChild(newProduct);
        });

        const runningProductsSection = document.getElementById('runningProductsSection');
        runningProductsSection.innerHTML = '';
        runningProductsSection.appendChild(categorySection);
    }).catch(error => {
        console.error("Error fetching products by category:", error);
    });
}

// Call the function to display products by category
fetchAndDisplayProductsByCategory("specificCategoryId"); // Replace "specificCategoryId" with the actual category ID
