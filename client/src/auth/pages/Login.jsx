import { useState } from 'react'
// import { handleLogin } from '../hook/auth.hook.js'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   handleLogin(formData)
  // }

  return (
    <div style={{ padding: '24px', maxWidth: 400, margin: '0 auto' }}>
      <h1>Login</h1>
      <form >
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            // onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            // onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login