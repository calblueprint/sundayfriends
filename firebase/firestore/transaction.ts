import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import Query from "firebase/firestore";
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
    const allTransactions = await transactionsCollection
      .orderBy("date", "desc")
      .get();
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
 *
 */
export const getTransactionByDate = async (
  startDate: Date,
  endDate: Date
): Promise<Transaction[]> => {
  try {
    // query everything in the transaction collection
    const allTransactions = await transactionsCollection
      .where("date", ">", startDate)
      .where("date", "<=", endDate)
      .orderBy("date", "desc")
      .get();
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
  transaction: Transaction,
  expireDate: Date,
  deleteDate: Date
): Promise<void> => {
  try {
    // get expiration date
    const expiration = {
      expire_id: null,
      admin_name: transaction.admin_name,
      date: expireDate,
      deleteDate: deleteDate,
      description: transaction.description,
      family_id: transaction.family_id,
      point_gain: transaction.point_gain * -1,
      user_name: transaction.user_name,
      user_id: transaction.user_id,
    };
    var exp = await transactionsCollection.doc();
    await exp.set(expiration);
    transaction.expire_id = exp.id;
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
    const transaction = await transactionsCollection.doc(transactionId).get();
    const data = transaction.data();
    await transactionsCollection.doc(data.expire_id).delete();
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
      .where("point_gain", ">", 0)
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
  const transaction_id = doc.id.toString();
  const data = doc.data();
  const transaction = {
    transaction_id: transaction_id,
    expire_id: data.expire_id,
    admin_name: data.admin_name,
    date: new Date(data.date.toMillis()).toLocaleDateString(),
    deleteDate: new Date(data.deleteDate.toMillis()).toLocaleDateString(),
    description: data.description,
    family_id: data.family_id,
    point_gain: data.point_gain,
    user_name: data.user_name,
    user_id: data.user_id,
  };
  return transaction as Transaction;
};
