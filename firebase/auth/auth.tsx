import { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import { getAdmin } from "../firestore/admin";
import { Admin } from "../../types/schema";

const auth = firebaseApp.auth();

export type AuthData = {
    authUser: Admin,
    loading: Boolean,
}

// TODO handle/throw errors accordingly
export const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
        console.error(e);
        throw e;
    }
    // TODO make sure an entry with corresponding info is created in the admins table
}

const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<Admin>(null);
    const [loading, setLoading] = useState<Boolean>(false);

    const handleAuthChange = async (authState) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        // verify if adminData exists
        const adminData = await getAdmin(authState.uid);
        if (adminData) {
            setAuthUser(adminData);
        } else {
            setAuthUser(null);
            await auth.signOut();
            throw new Error("Not an admin user");
        }
        setLoading(false);
    }

    // add observer to deal with changes in auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handleAuthChange);
        return () => unsubscribe();
    }, []);

    return { authUser, loading };
}

export default useFirebaseAuth;