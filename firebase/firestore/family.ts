import firebaseApp from '../firebase';
import 'firebase/firestore';
import { Family } from '../../types/schema';

const db = firebaseApp.firestore();
const familyCollection = db.collection('families');

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
}

/**
 * Returns all the families from firestore
 */
 export const getAllFamilies = async (): Promise<Family[]> => {
    try {
      const allFamilies = await familyCollection.get();
      return allFamilies.docs.map((doc) => doc.data() as Family);
    } catch (e) {
      console.warn(e);
      throw e;
    }
  };

/**
 * Adds the given family data to firestore
 */
export const addFamily = async (family: Family) => {
    try {
        await familyCollection.doc().set(family);
    } catch (e) {
        console.warn(e);
        throw e;
    }
};

/**
 * Deletes the family from firestore with the given familyId
 */
export const deleteFamily = async (familyId: string) => {
    try {
        await familyCollection.doc(familyId).delete();
    } catch (e) {
        console.warn(e);
        throw e;
    }
};