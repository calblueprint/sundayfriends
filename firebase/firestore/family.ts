import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Family, User, Family_Counter } from "../../types/schema";
import { getUser, updateUserPoints } from "./user";
import { deleteTransaction } from "./transaction";

const db = firebaseApp.firestore();
const familyCollection = db.collection("families");

/**
 * Returns the family data from firestore with the given userId
 */
export const getFamily = async (familyId: string): Promise<Family> => {
  try {
    const doc = await familyCollection.doc(familyId).get();
    return doc.data() as Family;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCountAndIncrement = async (): Promise<number> => {
  try {
    var doc = await familyCollection.doc("count").get()
    const family_counter = doc.data() as Family_Counter;
    family_counter.counter += 1;

    familyCollection.doc("count").set(family_counter)
    return family_counter.counter
  } catch (e) {
    console.warn(e);
    throw e;
  }
}

/**
 * Returns all the families from firestore
 */
export const getAllFamilies = async (): Promise<Family[]> => {
  try {
    const promises: Promise<Family>[] = [];
    const allFamilies = await familyCollection
      .where('__name__', '!=', 'count')
      .get()
      .then((doc) => {
        doc.forEach((item) => promises.push(parseFamily(item)));
      });
    
    // const  = await allFamilies.docs.map((doc) => {
    //     parseFamily(doc)
    //   }
    // );
    const families = await Promise.all(promises);
    return families;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Returns a family from firestore by ID
 */
export const getFamilyById = async (FID: string): Promise<Family> => {
  try {
    const family = await familyCollection.doc(FID).get();
    if (family.data()) {
      return await parseFamily(family);
    }
    return null;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Add a family
 */
export const addFamily = async (
  family: Family
): Promise<void> => {
  try {
    await familyCollection.doc().set(family);
  } catch (e) {
    console.warn(e);
    throw e;
  }
}

/**
 * Update last_active
 */
 export const updateLastActive = async (FID: string, date: Date): Promise<void> => {
  const doc = await familyCollection.doc(FID).get();
  var data = doc.data();
  data.last_active = date;
  
  familyCollection.doc(FID).set(data);
}

/**
 * Update the family's total points value.
 */
export const updateFamilyPoints = async (FID: string, points: number): Promise<void> => {
  const doc = await familyCollection.doc(FID).get();
  var data = doc.data();
  data.total_points = points;
  
  familyCollection.doc(FID).set(data);
}

export const deleteUserFromFamily = async (FID: string, user_id: string): Promise<void> => {
  const doc = await familyCollection.doc(FID).get();
  var data = doc.data();
  const index = data.user_ids.indexOf(user_id);
  data.user_ids.splice(index, 1);
  
  familyCollection.doc(FID).set(data);
}

const calculateFamilyPoints = async (users: User[]): Promise<number> => {
  var familypoints = 0;
  users.map((user) => {
    if (user.role != "Child") {
      familypoints += user.points;
    }
  })
  return familypoints;
}

const parseFamily = async (doc) => {
  const family_id = doc.id;
  const data = doc.data();
  const last_active = new Date(data.last_active.toMillis()).toLocaleDateString();
  const user_ids = data.user_ids;
  const promises: Promise<User>[] = user_ids.map((user_id) => getUser(user_id));
  const users = await Promise.all(promises);
  const total_points = data.total_points;
  const family_name = data.family_name;
  const family = { family_id, family_name, last_active, total_points, user_ids, users };
  return family as Family;
};
