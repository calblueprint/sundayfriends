import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Admin } from "../../types/schema";

const db = firebaseApp.firestore();
const adminCollection = db.collection("admins");

/**
 * Checks if given uuid belongs to an admin
 */
export const checkAdminId = async (adminId: string): Promise<boolean> => {
  try {
    const doc = await adminCollection.doc(adminId).get();
    return doc.exists;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Returns the admin data from firestore with the given adminId
 */
export const getAdmin = async (adminId: string): Promise<Admin> => {
  try {
    const doc = await adminCollection.doc(adminId).get();
    const adminData = doc.data() as Admin;
    // enables date objects to be serializable during SSR
    // adminData.created_at = adminData.created_at.toDate().toString();
    // adminData.last_active = adminData.last_active.toDate().toString();
    return adminData;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Returns all admin data from firestore
 */
export const getAllAdmins = async (): Promise<Admin[]> => {
  try {
    // query everything in the transaction collection
    const allAdmins = await adminCollection.get();
    const promises: Promise<Admin>[] = allAdmins.docs.map((doc) =>
      parseAdmin(doc)
    );
    const admins = await Promise.all(promises);
    return admins;
  } catch (e) {
    console.warn(e);
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

const parseAdmin = async (doc) => {
  const data = doc.data();
  const admin = {
    created_at: data.created_at,
    email: data.email,
    full_name: data.full_name,
    phone_number: data.phone_number,
    role: data.role,
  };
  return admin as Admin;
};
