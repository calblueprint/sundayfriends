import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Admin } from "../../types/schema";
import { deleteAdminInvite, getAdminInvitebyEmail } from "./invite_admin";

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
    const adminData = doc.data();
    // enables date objects to be serializable during SSR
    // adminData.created_at = adminData.created_at.toDate().toString();
    // adminData.last_active = adminData.last_active.toDate().toString();
    // return parseAdmin(doc);
    return parseAdmin(doc);
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
    // query everything in the admin collection
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
export const addAdmin = async (admin: Admin, uid: string): Promise<void> => {
  try {
    await adminCollection.doc(uid).set(admin);
    const adminInvite = await getAdminInvitebyEmail(admin.email);
    await deleteAdminInvite(adminInvite.adminInviteId);
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
    created_at: new Date(data.created_at.toMillis()).toLocaleDateString(),
    last_active: new Date(data.last_active.toMillis()).toLocaleDateString(),
    email: data.email,
    name: data.name,
    phone: data.phone,
    role: data.role,
    admin_id: doc.id.toString(),
  };
  return admin as Admin;
};
