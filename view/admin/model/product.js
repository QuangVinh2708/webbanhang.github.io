import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, runTransaction, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import Utils from "../controller/utils.js";
class Product {
    constructor() {
        this.getFirebaseStuff();
        this.utils = new Utils();
    }
    getFirebaseStuff() {
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
        this.db = getDatabase();
    }
    /**
     * 
     * @returns {Promise<Number>} get current product counter
     */
    async getNextProductID() {
        const dbref = ref(this.db, 'ProductCounter');
        return get(dbref).then((snapshot) => {
            if (snapshot.exists()) {
                return 'SP' + this.utils.formatCounter(snapshot.val() + 1);
            } else {
                return 0;
            }
        }).catch((error) => {
            console.error(error);
            return 0;
        });
    }
    /**
     * 
     * @returns {Promise<String>} get current product ID
     */
    async getCurrentProductID() {
        const dbref = ref(this.db, 'ProductCounter');
        return get(dbref).then((snapshot) => {
            if (snapshot.exists()) {
                return 'SP' + this.utils.formatCounter(snapshot.val());
            } else {
                return 0;
            }
        }).catch((error) => {
            console.error(error);
            return 0;
        });
    }
    /**
     * 
     * @param {string} productID 
     * @returns {Promise<object>} object {Category, CreatedDate, Description, Detail, Images, Name, Price, PurchasePrice,  Promotion , Size, UpdateDate}
     */
    async querryProductByID(productID) {
        const dbref = ref(this.db, 'Product/' + productID);
        return get(dbref).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        }).catch((error) => {
            console.error(error);
            return null;
        });
    }
    /**
     * 
     * @param {Object} data {Category, CreatedDate, Description, Detail, Images, Name, Price, PurchasePrice,  Promotion , Size, UpdateDate}
     */
    async setProduct(data) {
        const runTransactionResult = await runTransaction(ref(this.db, 'ProductCounter'), (counter) => {
            return counter + 1;
        });
        const productID = 'SP' + this.utils.formatCounter(runTransactionResult.snapshot.val(), 5);
        const newData = { ...data, ProductID: productID };
        const dbref = ref(this.db, 'Product/' + productID);
        set(dbref, data).then(() => {
            alert('Add product successfully');
        }).catch((error) => {
            alert('Add product failed');
        })
    }
    /**
     * 
     * @param {string} productID 
     * @param {Object} data 
     */
    async updateProduct(productID, data) {
        const dbref = ref(this.db, 'Product/' + productID);
        get(dbref).then((snapshot) => {
            if (!snapshot.exists()) {
                alert('Product not found');
                return;
            }
        }).catch((error) => {
            console.error(error);
            return;
        });
        update(dbref, data).then(() => {
            alert('Update product successfully');
        }).catch((error) => {
            alert('Update product failed');
        })
    }
    /** 
     * @param {String} productID 
     * @param {Object} size {size, quantity}
     */
    async updateQuantityBasedOnSize(productID, size) {
        const dbref = ref(this.db, 'Product/' + productID + '/Size');
        const product = await this.querryProductByID(productID);
        const productSize = product.Size;
        productSize[size.size] += size.quantity;    
        update(dbref, productSize).then(() => {
            alert('Update product size successfully');
        }).catch((error) => {
            alert('Update product size failed');
        })
    }
    /**
     * 
     * @returns {Promise<Array>} array of objects {key , item : {Category, CreatedDate, Description, Detail, Images, Name, Price, PurchasePrice,  Promotion , Size, UpdateDate}}
     */
    async getProductList() {
        const dbref = ref(this.db, 'Product');
        return get(dbref).then((snapshot) => {
            if (snapshot.exists()) {
                return this.utils.snapshotToArray(snapshot);
            } else {
                return [];
            }
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

}
export default Product;