import { useState, createContext, useMemo } from "react";

import { useAccessToken } from "../hooks/useAuth";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const accessTokenQuery = useAccessToken();

  const currentUser = User || accessTokenQuery.data?.data?.payloadtofrontend || null;

  const value = useMemo(
    () => ({
      User: currentUser,
      setUser,
      authLoading: accessTokenQuery.isLoading,
      authError: accessTokenQuery.error,
      authFetched: accessTokenQuery.isFetched,
    }),
    [currentUser, accessTokenQuery.isLoading, accessTokenQuery.error, accessTokenQuery.isFetched],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
