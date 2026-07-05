import { useState } from "react"
import { handleSignup } from "../hook/auth.hook.js"

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
    })
    
    const handleChange = (e) => {
      const { value, name } = e.target;
      // ✅ FIX 1: यहाँ '...formData' (spread operator) लगाना ज़रूरी है
      setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      handleSignup(formData)

      setFormData({
        username: '',
        email: '',
        password: ''
      })
    }

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        {/* ✅ FIX 2: यहाँ value में formData.name की जगह formData.username होगा */}
        <input 
          type="text" 
          name="username" 
          placeholder="name" 
          onChange={handleChange} 
          value={formData.username} 
        />
        <input 
          type="email" 
          name="email"  
          placeholder="email" 
          onChange={handleChange} 
          value={formData.email} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="password" 
          onChange={handleChange} 
          value={formData.password} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
