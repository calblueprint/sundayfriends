import { createContext, useContext } from "react";
import useFirebaseAuth, { UserAuth } from "./auth";

const authUserContext = createContext<UserAuth>({
    authUser: null,
    loading: true,
});

const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}

export const useAuth = () => useContext(authUserContext);

export default AuthUserProvider;