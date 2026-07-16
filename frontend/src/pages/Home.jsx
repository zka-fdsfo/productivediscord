
import React from 'react'
import { useContext } from 'react'
import { AuthContext} from '../context/auth.context.jsx'

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome, {user}!</h1>
    </div>
  )
}

export default Home