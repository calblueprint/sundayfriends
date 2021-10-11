import firebaseApp from '../firebase';
import { getFirestore, collection, query, doc, getDoc, getDocs, setDoc, deleteDoc, where } from 'firebase/firestore';
import { Transaction } from '../../types/schema';

const db = getFirestore(firebaseApp);
const transactionsCollection = collection(db, "transactions");

/**
 * Returns the transaction data from firestore with the given transactionId
 */
export const getTransaction = async (transactionId: string): Promise<Transaction> => {
    try {
        const docRef = doc(db, "transactions", transactionId);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Transaction;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/**
 * Returns all transaction data from firestore
 */
export const getAllTransactions = async (): Promise<Transaction[]> => {
    try {
        // query everything in the transaction collection
        const dbQuery = query(transactionsCollection);
        const querySnapshots = await getDocs(dbQuery);
        return querySnapshots.docs.map((doc) => doc.data() as Transaction);
    } catch (e) {
        console.warn(e);
        throw e;
    }
}

/**
 * Returns all positive transaction data from firestore
 */
 export const getPosTransactions = async (): Promise<Transaction[]> => {
    try {
        // query everything in the transaction collection
        const dbQuery = query(transactionsCollection, where("pointGain", ">=", 0));
        const querySnapshots = await getDocs(dbQuery);
        return querySnapshots.docs.map((doc) => doc.data() as Transaction);
    } catch (e) {
        console.warn(e);
        throw e;
    }
}

/**
 * Returns all negative transaction data from firestore
 */
 export const getNegTransactions = async (): Promise<Transaction[]> => {
    try {
        // query everything in the transaction collection
        const dbQuery = query(transactionsCollection, where("pointGain", "<", 0));
        const querySnapshots = await getDocs(dbQuery);
        return querySnapshots.docs.map((doc) => doc.data() as Transaction);
    } catch (e) {
        console.warn(e);
        throw e;
    }
}

/**
 * Adds the given transaction data to firestore
 */
export const addTransaction = async (transaction: Transaction) => {
    try {
        const newTransactionRef = doc(transactionsCollection);
        await setDoc(newTransactionRef, transaction)
    } catch (e) {
        console.warn(e);
        throw e;
    }
};

/**
 * Deletes the transaction from firestore with the given transactionId
 */
export const deleteTransaction = async (transactionId: string) => {
    try {
        const transactionRef = doc(transactionsCollection, transactionId);
        await deleteDoc(transactionRef);
    } catch (e) {
        console.warn(e);
        throw e;
    }
};