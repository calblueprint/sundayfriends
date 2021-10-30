import firebaseApp from "../firebase";
import "firebase/firestore";
import { Admin } from "../../types/schema";

const db = firebaseApp.firestore();
const adminCollection = db.collection("admins");

/**
 * Returns the admin data from firestore with the given adminId
 */
export const getAdmin = async (adminId: string): Promise<Admin> => {
  try {
    const doc = await adminCollection.doc(adminId).get();
    return doc.data() as Admin;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Adds the given admin data to firestore
 */
export const addAdmin = async (admin: Admin): Promise<void> => {
  try {
    await adminCollection.doc().set(admin);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Deletes the admin from firestore with the given adminId
 */
export const deleteAdmin = async (adminId: string): Promise<void> => {
  try {
    await adminCollection.doc(adminId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
