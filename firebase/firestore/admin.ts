import firebaseApp from '../firebase';
import { getFirestore, collection, query, doc, getDoc, getDocs, setDoc, deleteDoc, where } from 'firebase/firestore';
import { Admin } from '../../types/schema';

const db = getFirestore(firebaseApp);
const adminCollection = collection(db, "admins");

/**
 * Returns the admin data from firestore with the given adminId
 */
export const getAdmin = async (adminId: string): Promise<Admin> => {
    try {
        const docRef = doc(db, "admins", adminId);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Admin;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

/**
 * Adds the given admin data to firestore
 */
export const addAdmin = async (admin: Admin) => {
    try {
        const newAdminRef = doc(adminCollection);
        await setDoc(newAdminRef, admin)
    } catch (e) {
        console.warn(e);
        throw e;
    }
};

/**
 * Deletes the admin from firestore with the given adminId
 */
export const deleteAdmin = async (adminId: string) => {
    try {
        const adminRef = doc(adminCollection, adminId);
        await deleteDoc(adminRef);
    } catch (e) {
        console.warn(e);
        throw e;
    }
};