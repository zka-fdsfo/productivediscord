import { RouterProvider } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Home from './auth/pages/Home'
import { AuthProvider } from './auth/auth.context'

import { router } from './app.routes'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App