import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const { token } = useParams() 

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
        setMessage('Passwords do not match.')
        return
    }

    try {
      const res = await fetch(`https://t3a2-mern-app.onrender.com/user${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPassword
