import {createBrowserRouter} from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Home from './auth/pages/Home'
import ProtectedRoute from './auth/protective/Protective.jsx'

export const router = createBrowserRouter([
    {
        path: "/",
        element:<ProtectedRoute><Home /></ProtectedRoute> 
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])