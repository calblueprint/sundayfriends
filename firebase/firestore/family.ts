import firebaseApp from '../firebase';
import { getFirestore, collection, query, doc, getDoc, getDocs, setDoc, deleteDoc, where, orderBy } from 'firebase/firestore';
import { Family } from '../../types/schema';

const db = getFirestore(firebaseApp);
const familyCollection = collection(db, "families");

/**
 * Returns the family data from firestore with the given familyId
 */
export const getFamily = async (familyId: string): Promise<Family> => {
    try {
        const docRef = doc(db, "families", familyId);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Family;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/**
 * Returns all family data from firestore
 */
 export const getAllFamilies = async (): Promise<Family[]> => {
    try {
        // query everything in the family collection
        const dbQuery = query(familyCollection, orderBy('familyName'));
        const querySnapshots = await getDocs(dbQuery);
        return querySnapshots.docs.map((doc) => doc.data() as Family);
    } catch (e) {
        console.warn(e);
        throw e;
    }
}

/**
 * Adds the given family data to firestore
 */
export const addFamily = async (family: Family) => {
    try {
        const newFamilyRef = doc(familyCollection);
        await setDoc(newFamilyRef, family)
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
        const familyRef = doc(familyCollection, familyId);
        await deleteDoc(familyRef);
    } catch (e) {
        console.warn(e);
        throw e;
    }
};