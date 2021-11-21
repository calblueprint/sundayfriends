import firebaseApp from "../firebaseApp";
import "firebase/firestore";

const db = firebaseApp.firestore();
const adminInvitesCollection = db.collection("admin_invites");

export const checkAdminActivationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    const doc = await adminInvitesCollection.where("email", "==", [email]);
    console.log(doc);

    return doc ? true : false;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
