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
    const trimedID = adminId.toString().replace(/\s/g, "");
    const doc = await adminCollection.doc(trimedID).get();
    return parseAdmin(doc);
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

const parseAdmin = async (doc) => {
  const admin_uid = doc.id.toString();
  const data = doc.data();
  const admin = {
    admin_id: admin_uid,
    name: data.name,
    created_at: new Date(data.created_at.toMillis()).toLocaleDateString(),
    last_active: new Date(data.last_active.toMillis()).toLocaleDateString(),
    email: data.email,
    phone: data.phone,
    role: data.role,
    password: data.password,
  };
  return admin as Admin;
}