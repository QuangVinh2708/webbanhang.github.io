import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

class User {
    constructor() {
        this.ROLE = {
            USER: 1,
            ADMIN: 2,
            WAREHOUSE: 3,
            CASHIER: 4,
            SALES: 5
        };
        this.defaultPassword = '12345678';
        this.originURL = ".";
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
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
    }

    /**
     * Track user login and store user ID in local storage
     */
    trackUserLogin() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                localStorage.setItem('userID', user.uid);
            } else {
                // Handle user not logged in
            }
        });
    }

    getRoleName(role) {
        switch (role) {
            case this.ROLE.USER:
                return 'User';
            case this.ROLE.ADMIN:
                return 'Admin';
            case this.ROLE.WAREHOUSE:
                return 'Warehouse';
            case this.ROLE.CASHIER:
                return 'Cashier';
            case this.ROLE.SALES:
                return 'Sales';
            default:
                return 'Unknown';
        }
    }

    transRoleKeyToName(role) {
        switch (role) {
            case 'USER':
                return 'Người dùng';
            case 'ADMIN':
                return 'Quản trị viên';
            case 'WAREHOUSE':
                return 'Thủ kho';
            case 'CASHIER':
                return 'Thu ngân';
            case 'SALES':
                return 'Nhân viên bán hàng';
            default:
                return 'Không xác định';
        }
    }

    /**
     * Redirect based on user role
     * @param {String} role {User, Admin, Warehouse, Cashier, Sales}
     */
    redirectBasedOnRole(role) {
        if (role === 'Admin') {
            window.location.href = `${this.originURL}/view/admin/user.html`;
        } else if (role === 'Warehouse') {
            window.location.href = `${this.originURL}/view/admin/warehouse.html`;
        } else if (role === 'Cashier') {
            window.location.href = `${this.originURL}/view/admin/statisticSales.html`;
        } else if (role === 'Sales') {
            window.location.href = `${this.originURL}/view/admin/category.html`;
        }
    }

    /**
     * Query user by userID
     * @param {String} userID
     * @returns {Promise<Object>} User data
     */
    async queryUser(userID) {
        const db = getDatabase();
        const reference = ref(db, 'User/' + userID);
        const snapshot = await get(reference);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            throw new Error("User not found");
        }
    }

    /**
     * Get role of user
     * @param {String} userID
     * @returns {Promise<String>} User role as a string
     */
    async getRoleUser(userID) {
        const db = getDatabase();
        const reference = ref(db, 'User/' + userID);
        const snapshot = await get(reference);
        if (snapshot.exists()) {
            const role = snapshot.val().Role;
            return this.getRoleName(role);
        } else {
            throw new Error("User not found");
        }
    }

    /**
     * Check if user exists
     * @param {String} userID
     * @returns {Promise<Boolean>}
     */
    async isUserExist(userID) {
        const db = getDatabase();
        const reference = ref(db, 'User/' + userID);
        const snapshot = await get(reference);
        return snapshot.exists();
    }

    /**
     * Get list of all users
     * @returns {Promise<Object>} List of users
     */
    async getListUser() {
        const db = getDatabase();
        const reference = ref(db, 'User/');
        const snapshot = await get(reference);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return [];
        }
    }
}

export default User;
