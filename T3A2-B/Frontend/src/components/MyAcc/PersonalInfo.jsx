import React, { useState } from 'react';
import sessionState from '../../routes/store.js';

const UpdateUser = () => {
    const { user } = sessionState((state) => ({
        user: state.user,
    }));

    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        phNumber: '',
    });

    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isValidPhNumber = (phNumber) => /^04\d{8}$/.test(phNumber);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateField = (name, value) => {
        let errorMsg = '';
        if (name === 'email' && value && !isValidEmail(value)) {
            errorMsg = 'Invalid email format.';
        } else if (name === 'confirmEmail' && value && value !== formData.email) {
            errorMsg = 'Email addresses do not match.';
        } else if (name === 'password' && value && !isValidPassword(value)) {
            errorMsg = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        } else if (name === 'confirmPassword' && value && value !== formData.password) {
            errorMsg = 'Passwords do not match.';
        } else if (name === 'phNumber' && value && !isValidPhNumber(value)) {
            errorMsg = 'Phone number must start with 04 and be exactly 10 digits long.';
        }
        return errorMsg;
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(`https://t3a2-mern-app.onrender.com/user/${user._id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email || user.email,
                        password: formData.password || user.password,
                        phNumber: formData.phNumber || user.phNumber,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAdmin: user.isAdmin,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update user information');
                }

                const updatedUser = await response.json();
                console.log('User updated successfully:', updatedUser);
            } catch (error) {
                console.error('Error: Failed to update user information', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    submit: error.message,
                }));
            }
        }
    };

    const renderError = (field) => {
        return errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>;
    };

    return (
        <div className="UpdateAccountBox">
            <h5>Personal Information</h5>
            <p>Enter new contact Number</p>
            <input
                type="number"
                name="phNumber"
                value={formData.phNumber}
                onChange={handleChange}
            />
            {renderError('phNumber')}
            <p>Enter new email</p>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <p>Confirm Email</p>
            <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
            />
            {renderError('email')}
            {renderError('confirmEmail')}
            <p>Enter new password</p>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <p>Confirm Password</p>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {renderError('password')}
            {renderError('confirmPassword')}
            <button type="submit" onClick={handleSubmit}>
                Update Information
            </button>
            {renderError('submit')}
        </div>
    );
};

export default UpdateUser;
