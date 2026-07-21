import {
    useState,
    createContext,
    useEffect,
    useMemo,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(null);



    useEffect(() => {
        console.log("Context User Updated:", User);
    }, [User]);
    const value = useMemo(
        () => ({
            User,
            setUser,

        }),
        [User]
    );
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}