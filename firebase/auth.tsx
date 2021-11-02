import { useState, useEffect, createContext, useContext } from "react";
import firebaseApp from "./firebaseApp";
import { checkAdminId } from "./firestore/admin";
import nookies from "nookies";

const auth = firebaseApp.auth();

export type AuthData = {
    authUser: any,
    loading: boolean,
}

// TODO handle/throw errors accordingly
export const signInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        const userUid = auth.currentUser.uid;
        // ensure that user signing in is an admin
        const isAdmin = await checkAdminId(userUid);
        if (!isAdmin) {
            await signOut();
            throw new Error(`${email} is not an admin user`);
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const registerWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
        console.error(e);
        throw e;
    }
    // TODO make sure an entry with corresponding info is created in the admins table
}

export const signOut = async (): Promise<void> => {
    try {
        await auth.signOut();
    } catch (e) {
        console.error(e);
        throw e;
    };
}

const AuthContext = createContext<AuthData>({
    authUser: null,
    loading: true
});

export const AuthProvider = ({ children }): JSX.Element => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setAuthUser(null);
                nookies.set(undefined, 'token', '', { path: '/' });
            } else {
                const userToken = await user.getIdToken();
                setAuthUser(user);
                nookies.set(undefined, 'token', userToken, { path: '/' });
            }
        });
    }, []);

    return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthData => {
    return useContext(AuthContext);
}