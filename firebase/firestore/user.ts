import firebaseApp from "../firebase";
import "firebase/firestore";
import { User } from "../../types/schema";

const db = firebaseApp.firestore();
const userCollection = db.collection("users");

/**
 * Returns the user data from firestore with the given userId
 */
export const getUser = async (userId: string): Promise<User> => {
  try {
    const doc = await userCollection.doc(userId).get();
    return doc.data() as User;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Adds the given user data to firestore
 */
export const addUser = async (user: User) => {
  try {
    await userCollection.doc().set(user);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Deletes the user from firestore with the given userId
 */
export const deleteUser = async (userId: string) => {
  try {
    await userCollection.doc(userId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
