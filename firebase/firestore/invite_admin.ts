import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { AdminInvite } from "../../types/schema";

const db = firebaseApp.firestore();
const adminInvitesCollection = db.collection("admin_invites");

/**
 * Adds the given admin data to firestore
 */
export const addAdminInvite = async (admin: AdminInvite) => {
  try {
    await adminInvitesCollection.doc().set(admin);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Deletes the admin from firestore with the given adminId
 */
export const deleteAdmin = async (adminId: string) => {
  try {
    await adminInvitesCollection.doc(adminId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
