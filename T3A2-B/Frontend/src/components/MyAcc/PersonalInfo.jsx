import React, { useState } from 'react'


const PersonalInformation = () => {
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrorMessage('')
    }

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value)
        setErrorMessage('')
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setErrorMessage('')
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setErrorMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let isValid = true

        setEmailErrorMessage('')
        setPasswordErrorMessage('')

        // Email validation
        if (!isValidEmail(email)) {
            setEmailErrorMessage('Invalid email format')
            isValid = false
        } else if (email !== confirmEmail) {
            setEmailErrorMessage('Email addresses do not match.')
            isValid = false
        }

        if (password !== confirmPassword) {
            setPasswordErrorMessage('Passwords do not match.')
            isValid = false
        }

        if (isValid) {
            // Submit form data to API
        }
    }
    return (
        <div className="UpdateAccountBox">
            <h5>Personal Information</h5>
            <p>Contact Number</p>
            <input 
                type="text" 
            />
            <p>Email</p>
            <input 
                type="email" 
                value={email} 
                onChange={handleEmailChange}
            />
            <p>Confirm Email</p>
            <input 
                type="email" 
                value={confirmEmail} 
                onChange={handleConfirmEmailChange}
            />
            {emailErrorMessage && <p style={{ color: 'red' }}>{emailErrorMessage}</p>}
            <p>Password</p>
            <input 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
            />
            <p>Confirm Password</p>
            <input 
                type="password" 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            {passwordErrorMessage && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
            <button 
                type="submit"
                onClick={handleSubmit}
            >Update Information</button>
        </div>
    )
}


export default PersonalInformation