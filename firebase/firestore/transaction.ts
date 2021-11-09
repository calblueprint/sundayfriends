import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import Query from 'firebase/firestore';
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
    return parseTransaction(doc);
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
    const allTransactions = await transactionsCollection.orderBy("date", "desc").get();
    const promises: Promise<Transaction>[] = allTransactions.docs.map((doc) =>
      parseTransaction(doc)
    );
    const transactions = await Promise.all(promises);
    return transactions;
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

/**
 * Returns the transaction data from firestore with the given transactionId
 */
export const getTransactionByUser = async (
  user_id: string
): Promise<Transaction[]> => {
  try {
    const promises: Promise<Transaction>[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getTransactions = await transactionsCollection
      .where("user_id", "==", user_id)
      .get()
      .then((doc) => {
        doc.forEach((item) => promises.push(parseTransaction(item)));
      });
    const transactions = await Promise.all(promises);
    return transactions;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const parseTransaction = async (doc) => {
  const data = doc.data();
  const transaction = {
    admin_name: data.admin_name,
    date: new Date(data.date.toMillis()).toLocaleDateString(),
    description: data.description,
    family_id: data.family_id,
    point_gain: data.point_gain,
    user_name: data.user_name,
  };
  return transaction as Transaction;
};
