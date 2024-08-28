import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sessionState from '../../routes/store'

const LoginField = ({previousRoute}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, userData, isAuthenticated, error } = sessionState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('attempting login ')
    try {
      await login(email, password)
    } catch (error) {
      console.error("Login failed:", error.message)
    }
  }

  useLayoutEffect(() => {
    if (isAuthenticated && previousRoute == 'user/login' && userData) {
      navigate('/user/myaccount')
    }
  }, [userData])

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" data-testid="Login">Login</button>
      </form>
      {isAuthenticated && <div>Login Successful!</div>}
    </div>
  )
}

export default LoginField