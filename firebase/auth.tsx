import React, { useState, useEffect, createContext, useContext } from "react";
import firebaseApp from "./firebaseApp";
import { User } from "@firebase/auth-types";
import { checkAdminId, addAdmin } from "./firestore/admin";
import nookies from "nookies";
import { Admin } from "../types/schema";

const auth = firebaseApp.auth();

/**
 * NOTE: We may need to update types for firebase auth in the future
 */

// TODO handle/throw errors accordingly
export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
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
    console.error(e.message);
    throw e;
  }
};

export const registerWithEmailAndPassword = async (
  admin: Admin,
  password: string
): Promise<void> => {
  try {
    auth.createUserWithEmailAndPassword(admin.email, password).then((data) => {
      addAdmin(admin, data.user.uid);
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  // TODO make sure an entry with corresponding info is created in the admins table
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const AuthContext = createContext<User>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}): JSX.Element => {
  const [authUser, setAuthUser] = useState<User>(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user: User): Promise<void> => {
      if (!user) {
        setAuthUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const userToken = await user.getIdToken();
        setAuthUser(user);
        nookies.set(undefined, "token", userToken, { path: "/" });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): User => {
  return useContext(AuthContext);
};
