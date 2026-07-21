import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ children }) {
  const { User } = useContext(AuthContext);
  if (!User) {
    // const navigate = useNavigate();
    // navigate("/login")
    console.log("User is not authenticated. Redirecting to login page.");
    return <Navigate to="/login" />;
  }
  return (

    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute