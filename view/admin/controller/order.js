import { getDatabase, ref, get, set, runTransaction, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import Utils from "./utils.js";
class Order {
    constructor() {
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
        const app = initializeApp(this.firebaseConfig);
        this.db = getDatabase();
        this.utils = new Utils();
        this.currentMonnth = new Date().getMonth() + 1;
    }
    getArrSalesOnEachDayInOneMonth(month, year) {
        const dbref = ref(this.db);
        const daysInMonth = new Date(year, month, 0).getDate();
        let arrSales = Array.from({ length: daysInMonth }, () => 0);
        return new Promise((resolve, reject) => {
            get(child(dbref, 'orders')).then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    let value = childSnapshot.val();
                    const { day, month } = this.utils.getDayMonthYearInOrder(value.orderDate);
                    if (day && month == this.currentMonnth) {
                        arrSales[day - 1] += parseInt(value.totalAmount);
                    }
                });
                resolve(arrSales);
            });
        });
    }
    getArrProduct() {
        const dbref = ref(this.db);
        return new Promise((resolve, reject) => {
            get(child(dbref, 'orders')).then(snapshot => {
                // arrProduct[id]: [item_name, quantity, total_price]
                let arrProduct = [];
                let totalSales = 0;
                snapshot.forEach(childSnapshot => {
                    let valueSnapShot = childSnapshot.val();
                    const { month } = this.utils.getDayMonthYearInOrder(valueSnapShot.orderDate);
                    if (month == this.currentMonnth) {
                        for (let item in valueSnapShot.items) {
                            const key = item;
                            const value = valueSnapShot.items[item];
                            totalSales += value.total_price;
                            if (arrProduct[key]) {
                                arrProduct[key][1] += value.quantity;
                                arrProduct[key][2] += value.total_price;
                            }
                            else
                                arrProduct[key] = [value.item_name, value.quantity, value.total_price];
                        }
                    }
                });
                let highestSaleOnProduct = {
                    name: '',
                    total_price: 0
                };
                let highestSaleQuantityOnProduct = {
                    name: '',
                    quantity: 0
                };
                for (let item in arrProduct) {
                    const key = item;
                    const value = arrProduct[item];
                    if (value[2] > highestSaleOnProduct.total_price) {
                        highestSaleOnProduct.name = value[0];
                        highestSaleOnProduct.id = key;
                        highestSaleOnProduct.total_price = value[2];
                    }
                    if (value[1] > highestSaleQuantityOnProduct.quantity) {
                        highestSaleQuantityOnProduct.name = value[0];
                        highestSaleQuantityOnProduct.id = key;
                        highestSaleQuantityOnProduct.quantity = value[1];
                    }
                }
                const objResolve = {
                    arrProduct,
                    totalSales,
                    highestSaleOnProduct,
                    highestSaleQuantityOnProduct
                }
                resolve(objResolve);
            });
        });
    }
}

export default Order;