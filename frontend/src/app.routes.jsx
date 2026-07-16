import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/LoginPage.jsx'
import Register from './pages/RegisterPage.jsx'
export const router = createBrowserRouter([
  {
    path: '/',
    element:<ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: '/login',
    element: <Login />
  }
  ,
  {
    path: '/register',
    element: <Register />
  }
])