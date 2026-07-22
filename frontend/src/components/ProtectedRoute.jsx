import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ children }) {
  const { User, authLoading, authFetched } = useContext(AuthContext);
  console.log(User, "pro", authLoading, authFetched)

  if (authLoading) {
    return null;
  }

  if (authFetched && !User) {
    console.log("User is not authenticated. Redirecting to login page.");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute