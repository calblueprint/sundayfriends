import { createContext, useContext } from "react";
import useFirebaseAuth, { AuthData } from "./auth";

const authUserContext = createContext<AuthData>({
    authUser: null,
    loading: true,
});

/**
 * Use context to provide which user is signed in to all pages
 */
const AuthUserProvider: React.FunctionComponent = ({ children }) => {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}

/**
 * useAuth hook to get data about signed in user
 */
export const useAuth = () => useContext(authUserContext);

export default AuthUserProvider;