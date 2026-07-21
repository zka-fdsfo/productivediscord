
import React from 'react'
import { useContext } from 'react'
import { AuthContext} from '../context/auth.context.jsx'

function Home() {
  const { User } = useContext(AuthContext);
  console.log("User in Home component:", User);
  return (
    <div>
      <h1>Welcome, {User?.name}!</h1>
    </div>
  )
}

export default Home