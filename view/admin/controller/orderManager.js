import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import Utils from "./utils.js";
import { getDatabase, ref, get, set, runTransaction, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import InvoiceImport from "../model/invoiceImport.js";
import Supplier from "../model/supplier.js";
import Product from "../model/product.js";
import Order from "../model/order.js";
class OrderManager {
    constructor() {
        this.utils = new Utils();
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

        this.OrderDetail = document.getElementById('order-detail');
        this.ODID = document.getElementById('ODID');
        this.Customer = document.getElementById('Customer');
        this.Address = document.getElementById('Address');
        this.Phone = document.getElementById('Phone');
        this.getTotal = document.getElementById('total-full');

        this.utils = new Utils();
        this.invoiceImportDB = new InvoiceImport();
        this.supplierDB = new Supplier();
        this.productDB = new Product();
        this.orderDB = new Order();

        this.createDataTable();
        this.invoiceExport = document.getElementById('invoice-export');

        // this.invoiceExport.addEventListener('click', )
    }
    async createDataTable() {
        const orderList = await this.orderDB.getOrderList();
        let objData = [];
        let dataSet = [];
        orderList.forEach(order => {
            objData.push(order.item)
        })
        orderList.forEach(order => {
            dataSet.push([
                order.key,
                order.item.name,
                order.item.orderDate,
                this.utils.formatToVND(order.item.totalAmount),
            ]);
        });
        $('#table-order').DataTable({
            data: dataSet,
            columns: [
                { title: "ID" },
                { title: "Khách hàng" },
                { title: "Ngày xuất hóa đơn" },
                { title: "Thành tiền" },
            ],
            rowCallback: (row, data) => {
                $(row).on('click', () => {
                    this.handleRowClick(row, data, objData);
                });
            }
        });
    }

    handleRowClick(row, data, objData) {
        let indexRow = row._DT_RowIndex;
        $('#order-detail tbody').remove();
        this.ODID.innerText = data[0];
        let totalFull = 0;
        this.Customer.innerText = objData[indexRow].name;
        this.Address.innerText = objData[indexRow].address;
        this.Phone.innerText = objData[indexRow].phone;
        const details = objData[indexRow].items;
        for (let product in details) {
            let id = document.createElement('th');
            let namePro = document.createElement('td');
            let quantity = document.createElement('td');
            let price = document.createElement('td');
            let total = document.createElement('td');
            id.innerHTML = product;
            quantity.innerHTML = details[product]['quantity'];
            namePro.innerHTML = details[product]['item_name'];
            price.innerHTML = this.utils.formatToVND(details[product]['unit_price']);
            total.innerHTML = this.utils.formatToVND(details[product]['total_price']);
            totalFull += details[product]['total_price'];
            this.getTotal.innerHTML = this.utils.formatToVND(totalFull);

            let tr = document.createElement('tr');
            tr.append(id, namePro, quantity, price, total);
            let tbody = document.createElement('tbody');
            tbody.appendChild(tr);
            this.OrderDetail.append(tbody);
        }
    }
}
const orderManager = new OrderManager();