import React, { useState, useMemo, createContext } from 'react'

// 1. Create the actual Context object outside the component
export const AuthContext = createContext(null);

// 2. Rename the component to AuthProvider so it doesn't conflict
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authReady, setAuthReady] = useState(false);

    const value = useMemo(() => ({
        user,
        setUser,
        loading,
        setLoading,
        authReady,
    }), [user, loading, authReady]);

    return (
        // 3. Use the Context object's Provider here
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// 4. Export the provider as default (or keep it as a named export)
export default AuthProvider;
