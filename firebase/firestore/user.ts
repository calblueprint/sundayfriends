import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Transaction, User } from "../../types/schema";
import { deleteTransaction, getTransactionByUser } from "./transaction";
import { deleteUserFromFamily } from "./family";

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
    const allUsers = await userCollection.orderBy("family_id").orderBy("full_name").get();
    const promises: Promise<User>[] = allUsers.docs.map((doc) =>
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
 * Returns all the users from firestore on conditional
 */
export const getUsersSearch = async (searchQ: string): Promise<User[]> => {
  try {
    const promises: Promise<User>[] = [];
    await userCollection
      .where("name", ">=", searchQ)
      .where("name", "<=", searchQ + "\uf8ff")
      .get()
      .then((doc) => {
        doc.forEach((item) => promises.push(parseUser(item)));
      });
    const users = await Promise.all(promises);
    //console.log("backend", users, searchQ);
    return users;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Returns the users from firestore by role
 */
export const getFilteredUsers = async (role: string): Promise<User[]> => {
  try {
    const promises: Promise<User>[] = [];
    var query: any = userCollection;
    if (role && role !== "All Roles") {
      query = query.where("role", "==", role);
    }
    await query.get().then((doc) => {
      doc.forEach((item) => promises.push(parseUser(item)));
    });
    const users = await Promise.all(promises);
    //console.log("backend", users);
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
 * Suspends the given user
 */
export const suspendUserToggle = async (userId: string): Promise<void> => {
  const trimedId = userId.toString().replace(/\s/g, "");
  const doc = await userCollection.doc(trimedId).get();
  var data = doc.data();
  data.suspended = !data.suspended;
  
  // var newUser = parseUser(doc);
  // (await newUser).suspended = true;
  userCollection.doc(trimedId).set(data);
} 

/**
 * Update last_active
 */
// export const updateLastActive = async (userId: string, date: Date): Promise<void> => {
//   const trimedId = userId.toString().replace(/\s/g, "");
//   const doc = await userCollection.doc(trimedId).get();
//   var data = doc.data();
//   data.last_active = date;
  
//   // var newUser = parseUser(doc);
//   // (await newUser).suspended = true;
//   userCollection.doc(trimedId).set(data);
// }

/**
 * Deletes the user from firestore with the given userId
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const user = await getUser(userId);
    await deleteUserFromFamily(user.family_id.toString(), userId);
    await userCollection.doc(userId).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const updateUserPoints = async (userId: string, points: number): Promise<void> => {
  const trimedId = userId.toString().replace(/\s/g, "");
  const doc = await userCollection.doc(trimedId).get();
  var data = doc.data();
  data.points = points;
  
  userCollection.doc(trimedId).set(data);
}

const calculateUserPoints = async (transactions: Transaction[]): Promise<number> => {
  var points = 0;
  transactions.map((transaction) => {
    if (transaction.expire_id != null && new Date(transaction.deleteDate) <= new Date()) {
      deleteTransaction(transaction.transaction_id)
    } else if (new Date(transaction.date) <= new Date()) {
      points += transaction.point_gain;
    }
  })
  return points;
}

const parseUser = async (doc) => {
  const user_id = doc.id.toString();
  const data = doc.data();
  const promise: Promise<Transaction[]> = getTransactionByUser(user_id);
  const transactions = await promise;
  // const points = await calculateUserPoints(user_id);
  //updateUserPoints(user_id, points);
  const user = {
    user_id: user_id,
    address: data.address,
    created_at: new Date(data.created_at.toMillis()).toLocaleDateString(),
    email: data.email,
    role: data.role,
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
