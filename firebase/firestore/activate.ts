import firebaseApp from "../firebaseApp";
import "firebase/firestore";

const db = firebaseApp.firestore();
const adminInvitesCollection = db.collection("admin_invites");

export const checkAdminActivationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    const doc = await adminInvitesCollection.doc(email).get();
    console.log(doc);
    return doc.exists;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
