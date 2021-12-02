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
    const query = await adminInvitesCollection
      .where("email", "==", admin.email)
      .get();
    const docs = query.docs;
    if (docs.length != 0) {
      throw "email already registered!";
    }
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

/**
 * Checks if email is in the invited emails table
 */
export const checkAdminActivationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    const qs = await adminInvitesCollection.where("email", "==", email).where("valid", "==", true).get();
    console.log(qs.docs)
    return qs.docs.length > 0;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
