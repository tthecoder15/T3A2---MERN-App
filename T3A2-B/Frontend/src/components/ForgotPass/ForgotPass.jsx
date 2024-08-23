import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <h2>Forgotten your password?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Password Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ForgotPassword
