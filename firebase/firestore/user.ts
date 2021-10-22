import firebaseApp from '../firebase';
import { getFirestore, collection, query, doc, getDoc, getDocs, setDoc, deleteDoc, where, orderBy } from 'firebase/firestore';
import { User } from '../../types/schema';

const db = getFirestore(firebaseApp);
const userCollection = collection(db, "users");

/**
 * Returns the user data from firestore with the given userId
 */
export const getUser = async (userId: string): Promise<User> => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as User;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/**
 * Returns all user data from firestore
 */
 export const getAllUsers = async (): Promise<User[]> => {
    try {
        // query everything in the user collection
        const dbQuery = query(userCollection, orderBy('full_name'));
        const querySnapshots = await getDocs(dbQuery);
        return querySnapshots.docs.map((doc) => doc.data() as User);
    } catch (e) {
        console.warn(e);
        throw e;
    }
}

/**
 * Adds the given user data to firestore
 */
export const addUser = async (user: User) => {
    try {
        const newUserRef = doc(userCollection);
        await setDoc(newUserRef, user)
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
        const userRef = doc(userCollection, userId);
        await deleteDoc(userRef);
    } catch (e) {
        console.warn(e);
        throw e;
    }
};