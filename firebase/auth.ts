import firebaseApp from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from "@firebase/auth";

const auth = getAuth(firebaseApp);

export const registerUser = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const signinUser = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}