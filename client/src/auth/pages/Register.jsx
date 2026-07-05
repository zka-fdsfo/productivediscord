import { useState } from "react"

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
    })
    const handleChange = (e) => {
      const { value, name } = e.target;
      setFormData({formData, [name]: value})
    }
    const handleSubmit = () => {
      
    }
  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="name" onChange={handleChange} value={formData.name}/>
        <input type="email" name="email"  placeholder="email" onChange={handleChange} value={formData.email}/>
        <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password}/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register