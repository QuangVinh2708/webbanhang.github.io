import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Cấu hình Firebase
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
const db = getDatabase(app);

function formatPrice(number) {
    let formattedNumber = number.toLocaleString('vi-VN');
    return formattedNumber + "đ";
}

function normalizeText(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Hàm tìm kiếm sản phẩm
async function searchProducts(event) {
    event.preventDefault(); // Ngăn chặn form submit theo cách mặc định

    const input = normalizeText(document.getElementById('cloth-input').value.trim());
    const listProductHTML = document.getElementById('search-results');

    if (input === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm.');
        listProductHTML.innerHTML = ''; // Xóa kết quả trước đó
        return;
    }

    const productsRef = ref(db, 'Product');
    const q = query(
        productsRef,
        orderByChild('Name')
    );

    try {
        const snapshot = await get(q);
        if (!snapshot.exists()) {
            listProductHTML.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
            showSearchResults();
            return;
        }

        listProductHTML.innerHTML = '';

        const products = [];
        snapshot.forEach(childSnapshot => {
            products.push(childSnapshot.val());
        });

        for (let value of products) {
            const normalizedProductName = normalizeText(value.Name || '');

            if (!normalizedProductName.includes(input)) {
                continue;
            }

            let amount = 0;
            for (let amountSize of Object.values(value.Size)) {
                amount += amountSize;
            }
            if (amount === 0) {
                continue;
            }

            console.log(value.Size);
            const newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = value.ProductID;

            newProduct.innerHTML = `
                <a href="detail.html?id=${value.ProductID}">
                    <img class="card-img-top" src="${value.Images ? Object.values(value.Images)[0].ImgURL : ''}" alt="${value.Name}">
                </a>
                <h2>${value.Name}</h2>
                <div class="price" style="font-weight: bold;">${formatPrice(value.Price)}</div>
            `;

            listProductHTML.appendChild(newProduct);
        }

        if (listProductHTML.innerHTML === '') {
            listProductHTML.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
        }
        showSearchResults();
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        alert('Lỗi khi tìm kiếm sản phẩm. Vui lòng thử lại sau.');
    }
}

function showSearchResults() {
    document.getElementById('showSearch').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeSearchResults() {
    document.getElementById('showSearch').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Gắn sự kiện lắng nghe vào form khi trang tải
window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('search-form');
    if (form) {
        form.addEventListener('submit', searchProducts);
    }

    const closeSearch = document.getElementById('closeSearch');
    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchResults);
    }

    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeSearchResults);
    }
});
