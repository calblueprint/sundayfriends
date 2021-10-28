import { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import { getAdmin } from "../firestore/admin";

const auth = firebaseApp.auth();

export type AuthData = {
    uid: string,
    email: string,
}

export type UserAuth = {
    authUser: AuthData,
    loading: Boolean,
}

const getUserData = (user) => {
    return {
        uid: user.uid,
        email: user.email,
    } as AuthData;
}

export const signInWithEmailAndPassword = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
}

export const registerWithEmailAndPassword = async (email: string, password: string) => {
    await auth.createUserWithEmailAndPassword(email, password);
}

const verifyAdmin = async (uid: string): Promise<boolean> => {
    const doc = await getAdmin(uid);
    console.log(doc)
    console.log('12314324')
    if (doc) {
        return true;
    }
    return false;
}

const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<AuthData>(null);
    const [loading, setLoading] = useState<Boolean>(false);

    const handleAuthChange = async (authState) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const userData = getUserData(authState);
        const isAdmin = await verifyAdmin(userData.uid);
        console.log('sfdsafsfas')
        console.log(isAdmin)
        if (isAdmin) {
            setAuthUser(userData);
        } else {
            setAuthUser(null);
            await auth.signOut();
            throw new Error('not an admin');
        }
        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handleAuthChange);
        return () => unsubscribe();
    }, []);

    return { authUser, loading };
}

export default useFirebaseAuth;