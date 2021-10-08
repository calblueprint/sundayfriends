import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore, collection, query, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { Transaction } from '../types/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

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
    const dbQuery = query(transactionsCollection);
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

export default firebaseApp;