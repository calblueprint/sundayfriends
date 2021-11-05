import firebaseApp from "../firebase";
import "firebase/firestore";
import { Transaction, User } from "../../types/schema";
import { getTransactionByUser } from "./transaction";

const db = firebaseApp.firestore();
const userCollection = db.collection("users");

/**
 * Returns the user data from firestore with the given userId
 */
export const getUser = async (userId: string): Promise<User> => {
  try {
    const trimedId = userId.toString().replace(/\s/g, "");
    const doc = await userCollection.doc(trimedId).get();
    return parseUser(doc);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Returns all the users from firestore
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const allFamilies = await userCollection.get();
    const promises: Promise<User>[] = allFamilies.docs.map((doc) =>
      parseUser(doc)
    );
    const users = await Promise.all(promises);
    return users;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Adds the given user data to firestore
 */
export const addUser = async (user: User): Promise<void> => {
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
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await userCollection.doc(userId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

const parseUser = async (doc) => {
  const user_id = doc.id.toString();
  const data = doc.data();
  const promise: Promise<Transaction[]> = getTransactionByUser(user_id);
  const transactions = await promise;
  const user = {
    address: data.address,
    created_at: new Date(data.created_at.toMillis()).toLocaleDateString(),
    email: data.email,
    family_head: data.family_head,
    family_id: data.family_id,
    full_name: data.full_name,
    last_active: new Date(data.last_active.toMillis()).toLocaleDateString(),
    parent: data.parent,
    points: data.points,
    reward_eligible: data.reward_eligible,
    suspended: data.suspended,
    phone_number: data.phone_number,
    transactions: transactions,
  };
  return user as User;
};
