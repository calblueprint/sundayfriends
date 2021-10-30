import firebaseApp from "../firebase";
import "firebase/firestore";
import { Transaction } from "../../types/schema";

const db = firebaseApp.firestore();
const transactionsCollection = db.collection("transactions");

/**
 * Returns the transaction data from firestore with the given transactionId
 */
export const getTransaction = async (
  transactionId: string
): Promise<Transaction> => {
  try {
    const doc = await transactionsCollection.doc(transactionId).get();
    return doc.data() as Transaction;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Returns all transaction data from firestore
 */
export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    // query everything in the transaction collection
    const allTransactions = await transactionsCollection.get();
    return allTransactions.docs.map((doc) => doc.data() as Transaction);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Adds the given transaction data to firestore
 */
export const addTransaction = async (
  transaction: Transaction
): Promise<void> => {
  try {
    await transactionsCollection.doc().set(transaction);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Deletes the transaction from firestore with the given transactionId
 */
export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  try {
    await transactionsCollection.doc(transactionId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
