// Import các thư viện cần thiết từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { getRemoteConfig } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-remote-config.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-performance.js";

// Cấu hình ứng dụng Firebase
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);
const remoteConfig = getRemoteConfig(app);
const performance = getPerformance(app);

// Hàm hiển thị dữ liệu theo danh mục
function displayDataByCategory(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Xóa dữ liệu cũ

    if (data) {
        for (const category in data) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            categoryDiv.innerHTML = `<h2>${category}</h2>`;

            if (category === "Product" && typeof data[category] === "object") {
                for (const productId in data[category]) {
                    const product = data[category][productId];
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    productDiv.innerHTML = `<h3>${productId}</h3>`;
                    displayProductFields(product, productDiv); // Hiển thị các trường sản phẩm bao gồm Hình ảnh và Kích thước đệ quy
                    categoryDiv.appendChild(productDiv);
                }
            } else {
                categoryDiv.innerHTML += `<pre>${JSON.stringify(data[category], null, 2)}</pre>`;
            }

            dataContainer.appendChild(categoryDiv);
        }
    } else {
        dataContainer.innerHTML = "No data available";
    }
}

// Hàm hiển thị các trường sản phẩm bao gồm Hình ảnh và Kích thước đệ quy
function displayProductFields(product, container) {
    for (const key in product) {
        if (typeof product[key] === "object" && key !== "Detail") {
            const subContainer = document.createElement('div');
            subContainer.innerHTML = `<strong>${key}:</strong>`;
            container.appendChild(subContainer);
            displayProductFields(product[key], subContainer); // Hiển thị đệ quy các trường con
        } else {
            if (key === "ImgURL") {
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', product[key]); // Thiết lập thuộc tính src cho ImgURL
                imgElement.setAttribute('alt', 'Product Image'); // Thiết lập thuộc tính alt cho tính năng truy cập
                container.appendChild(imgElement); // Thêm phần tử img vào container
            } else {
                container.innerHTML += `<p><strong>${key}:</strong> ${product[key]}</p>`;
            }
        }
    }
}

// Gọi hàm để đọc và hiển thị dữ liệu khi trang tải
window.onload = function () {
    readAllData();
};



// Hàm để đọc toàn bộ dữ liệu từ Realtime Database
function readAllData() {
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        displayDataByCategory(data);
    });
}
