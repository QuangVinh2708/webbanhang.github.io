
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, runTransaction, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import Utils from "../controller/utils.js";
class InvoiceExport {
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
     * @param {Object} data 
     */
    async addInvoiceExport(data) {
        const runTransactionResult = await runTransaction(ref(this.db, 'InvoiceExportCounter'), (invoiceExportCounter) => {
            return invoiceExportCounter + 1;
        });

        const invoiceExportID = 'HDXH' + this.utils.formatCounter(runTransactionResult.snapshot.val());
        const invoiceExportRef = ref(this.db, 'InvoiceExport/' + invoiceExportID);
        set(invoiceExportRef, data).then(() => {
            alert('Add invoice import successfully');
        }).catch((error) => {
            alert('Add invoice import failed');
        });
    }

    /**
     * 
     * @param {string} invoiceImportID 
     * @returns {Promise<object>} object {key, Date, Note, PaymentMethod, Supplier}
     */
    async querryInvoiceImportBasedOnID(invoiceImportID) {
        const dbref = ref(this.db, 'InvoiceImport/' + invoiceImportID);
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
     * @param {String} invoiceImportID 
     * @param {Object} data 
     */
    async updateInvoiceImport(invoiceImportID, data) {
        const dbref = ref(this.db, 'InvoiceImport/' + invoiceImportID);
        get(dbref).then((snapshot) => {
            if (!snapshot.exists()) {
                alert('Invoice import not found');
                return;
            }
        }).catch((error) => {
            console.error(error);
            return;
        });
        update(dbref, data).then(() => {
            alert('Update invoice import successfully');
        }).catch((error) => {
            alert('Update invoice import failed');
        });
    }

    /**
     * 
     * @returns {Promise<Array>} array of objects {key, item: {...}}
     */
    async getInvoiceExportList() {
        const dbref = ref(this.db, 'InvoiceExport');
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
export default InvoiceExport;