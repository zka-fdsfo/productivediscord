import { Routes, Route } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Home from './auth/pages/Home'
const App = () => {
  return (<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>)
}

export default App