import firebaseApp from "../firebaseApp";
import "firebase/firestore";

const db = firebaseApp.firestore();
const adminInvitesCollection = db.collection("admin_invites");

export const checkAdminActivationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    const qs = await adminInvitesCollection.where("email", "==", email).get();
    return qs.docs.length > 0;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
