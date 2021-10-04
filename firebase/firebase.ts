import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore, collection, query, where, doc, getDoc, getDocs, DocumentData } from 'firebase/firestore';
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

const loadTransaction = async (doc: DocumentData): Promise<Transaction> => {
  const adminDoc = await getDoc(doc.admin_id);
  const familyDoc = await getDoc(doc.family_id);
  const userDoc = await getDoc(doc.user_id);

  const transaction = {
    admin_id: adminDoc.id,
    date: doc.date,
    description: doc.description,
    family_id: familyDoc.id,
    point_gain: doc.point_gain,
    user_id: userDoc.id
  }
  return transaction;
}

export const getTransaction = async (id: string): Promise<Transaction> => {
  try {
    const docRef = doc(db, "transactions", id);
    const docSnap = await getDoc(docRef);
    const loadedTransaction = await loadTransaction(docSnap.data());
    return loadedTransaction;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const dbQuery = query(transactionsCollection);
    const querySnapshots = await getDocs(dbQuery);
    return Promise.all(querySnapshots.docs.map(async (doc) => await loadTransaction(doc.data())));
  } catch (e) {
    console.warn(e);
    throw e;
  }
}

export default firebaseApp;