import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Family, User } from "../../types/schema";
import { getUser } from "./user";

const db = firebaseApp.firestore();
const familyCollection = db.collection("families");

/**
 * Returns all the families from firestore
 */
export const getAllFamilies = async (): Promise<Family[]> => {
  try {
    const allFamilies = await familyCollection.get();
    const promises: Promise<Family>[] = allFamilies.docs.map((doc) =>
      parseFamily(doc)
    );
    const families = await Promise.all(promises);
    return families;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

const parseFamily = async (doc) => {
  const family_id = doc.id as string;
  const data = doc.data();
  const total_points = data.total_points;
  const user_ids = data.user_ids;
  const promises: Promise<User>[] = user_ids.map((user_id) => getUser(user_id));
  const users = await Promise.all(promises);
  const family_name = data.family_name;
  const family = { family_id, family_name, total_points, user_ids: users };
  return family as Family;
};
