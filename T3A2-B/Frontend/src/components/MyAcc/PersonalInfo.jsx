import React, { useState } from 'react'

const PersonalInformation = () => {
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrors((prevErrors) => ({ ...prevErrors, email: '' })) // Clear email error on change
    }

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value)
        setErrors((prevErrors) => ({ ...prevErrors, confirmEmail: '' })) // Clear confirmEmail error on change
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setErrors((prevErrors) => ({ ...prevErrors, password: '' })) // Clear password error on change
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' })) // Clear confirmPassword error on change
    }

    const validateEmail = () => {
        let isValid = true
        if (!isValidEmail(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid email format.',
            }))
            isValid = false
        } else if (email !== confirmEmail) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmEmail: 'Email addresses do not match.',
            }))
            isValid = false
        }
        return isValid
    }

    const validatePassword = () => {
        let isValid = true
        if (password !== confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match.',
            }))
            isValid = false
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Clear existing errors
        setErrors({})

        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()

        if (isEmailValid && isPasswordValid) {
            // Submit form data to API
            console.log('Form is valid, submitting data...')
        }
    }

    return (
        <div className="UpdateAccountBox">
            <h5>Personal Information</h5>
            <p>Enter new contact Number</p>
            <input 
                type="text" 
            />
            <p>Enter new email</p>
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
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            {errors.confirmEmail && <p style={{ color: 'red' }}>{errors.confirmEmail}</p>}
            <p>Enter new password</p>
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
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            <button 
                type="submit"
                onClick={handleSubmit}
            >Update Information</button>
        </div>
    )
}

export default PersonalInformation