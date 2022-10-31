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
    const qs = await adminInvitesCollection
      .where("email", "==", email)
      .where("valid", "==", true)
      .get();
    console.log(qs.docs);
    return qs.docs.length > 0;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Get admin invite by email
 */
 export const getAdminInvitebyEmail = async (
  email: string
): Promise<AdminInvite> => {
  console.log(email);
  try {
    const qs = await adminInvitesCollection.where("email", "==", email).get();
    const promises: Promise<AdminInvite>[] = qs.docs.map((doc) => {
      if (!doc.exists) {
        return null;
      }
      parseAdminInvite(doc)
    });
    const adminInvites = await Promise.all(promises);
    return adminInvites[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
};


/**
 * Get admin name by email from invite
 */
export const getAdminNamebyEmail = async (
  email: string
): Promise<AdminInvite> => {
  try {
    const doc = await adminInvitesCollection.doc(email).get();
    const adminData = doc.data() as AdminInvite;
    return adminData;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Delete admin invite by id
 */
export const deleteAdminInvite = async (
  admin_invite_id: string
): Promise<void> => {
  try {
    await adminInvitesCollection.doc(admin_invite_id).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
}

const parseAdminInvite = async (doc) => {
  const adminInviteId = doc.id;
  const data = doc.data();
  const email = data.email;
  const full_name = data.full_name;
  const valid = data.valid;
  const adminInvite = { adminInviteId, email, full_name, valid };
  return adminInvite as AdminInvite;
};