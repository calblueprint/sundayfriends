import firebaseApp from "../firebase";
import "firebase/firestore";
import { Family } from "../../types/schema";

const db = firebaseApp.firestore();
const familyCollection = db.collection("families");

/**
 * Returns all the families from firestore
 */
export const getAllFamilies = async () => {
  try {
    const allFamilies = await familyCollection.get();
    return allFamilies.docs.map((doc) => parseFamily(doc) as Family);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

const parseFamily = (doc) => {
  const family_id = doc.id as string;
  const data = doc.data();
  const total_points = data.total_points;
  const user_ids = data.user_ids;
  const family_name = data.family_name;
  const family = { family_id, family_name, total_points, user_ids };
  return family as Family;
};
