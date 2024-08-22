import React, { useState } from 'react'

const PersonalInformation = ({ userInfo, accessToken }) => {
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phNumber, setPhNumber] = useState('')
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

    const handlePhNumberChange = (e) => {
        setPhNumber(e.target.value)
        setErrors((prevErrors) => ({...prevErrors, phNumber: '' })) // Clear phNumber error on change
    }

    const validateEmail = () => {
        let isValid = true
        if (email || confirmEmail) {
            if (!isValidEmail(email)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid email format.',
                }))
                isValid = false
            } else if (email && email !== confirmEmail) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmEmail: 'Email addresses do not match.',
                }))
                isValid = false
            }
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Clear existing errors
        setErrors({})

        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()

        if (isEmailValid && isPasswordValid) {
            try {
                const response = await fetch('https://t3a2-mern-app.onrender.com/user/66c6efe531af28a3d83b60d0', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        phNumber: phNumber,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        isAdmin: userInfo.isAdmin,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Failed to update user information')
                }

                const updatedUser = await response.json()
                console.log('User updated successfully:', updatedUser)
            } catch (error) {
                console.error('Error: Failed to update user information', error)
            }
        }
    }

    return (
        <div className="UpdateAccountBox">
            <h5>Personal Information</h5>
            <p>Enter new contact Number</p>
            <input 
                type="number" 
                value={phNumber}
                onChange={handlePhNumberChange}
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