import {
    useState,
    createContext,
    useEffect,
    useMemo,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null)
    }

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            login,
            logout
        }),
        [user]
    );
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}