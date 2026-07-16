import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    // const navigate = useNavigate();
    // navigate("/login")
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute