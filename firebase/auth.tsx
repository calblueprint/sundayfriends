import { useState, createContext, useContext, ReactNode } from "react";
import firebaseApp from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from "@firebase/auth";

const auth = getAuth(firebaseApp);

type AuthData = {
    authUser: User,
    signInEmailPassword: (email: string, password: string) => Promise<User>,
}

const useAuthProvider = () => {
    const [authUser, setAuthUser] = useState<User>(null);

    const signInEmailPassword = (email: string, password: string) => {
        console.log('inside signInEmailPassword');
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                console.log('PUTANG INA')
                const user = userCred.user;
                setAuthUser(user);
                return user;
            })
            .catch((e) => {
                console.error(e);
                throw e;
            })
    }

    return {
        authUser,
        signInEmailPassword
    }
};

const authContext = createContext<AuthData>(
    {
        authUser: null,
        signInEmailPassword: (email: string, password: string) => null,
    });

export const AuthProvider = ({ children }) => {
    const userAuth = useAuthProvider();
    return (
        <authContext.Provider value={userAuth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}

export const registerUser = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}