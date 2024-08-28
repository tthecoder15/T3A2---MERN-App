import React, { useState } from 'react';
import sessionState from '../../routes/store';

const RegisterUser = ({ onSuccess }) => {
    const { apiBase, setUserData, token } = sessionState((state) => ({
        apiBase: state.apiBase,
        setUserData: state.setUserData,
        token: state.token,
    }));

    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        phNumber: '',
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isValidPhNumber = (phNumber) => /^04\d{8}$/.test(phNumber);
    const isValidName = (name) => /^[A-Z]/.test(name);

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
        } else if ((name === 'firstName' || name === 'lastName') && value && !isValidName(value)) {
            errorMsg = `${name === 'firstName' ? 'First' : 'Last'} name must start with a capital letter.`;
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
        setLoading(true);

        if (validateForm()) {
            try {
                const response = await fetch(`${apiBase}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token if required
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        phNumber: formData.phNumber,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        isAdmin: false,
                        pets: [], 
                        appointments: []
                    }),
                });

                const data = await response.json();

                const { newUser } = data;

                const updatedUser = {
                    ...newUser,
                    pets: Array.isArray(newUser.pets) ? newUser.pets : [],
                    appointments: Array.isArray(newUser.appointments) ? newUser.appointments : []
                };

                setUserData(updatedUser);

                setFormData({
                    email: '',
                    confirmEmail: '',
                    password: '',
                    confirmPassword: '',
                    phNumber: '',
                    firstName: '',
                    lastName: '',
                });
                setSuccessMessage('You have registered successfully, please log in.');
                
                onSuccess('You have registered successfully, please log in.');  // Notify parent component

                setErrors({});
            } catch (error) {
                console.error('Error:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    submit: error.message,
                }));
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const renderError = (field) => {
        return errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>;
    };

    return (
        <div className="UpdateAccountBox">
            <h5>Register Account</h5>
            <form onSubmit={handleSubmit}>
                <p>Enter First Name</p>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {renderError('firstName')}
                <p>Enter Last Name</p>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {renderError('lastName')}
                <p>Enter new contact Number</p>
                <input
                    type="text"
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
                {renderError('email')}
                <p>Confirm Email</p>
                <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                />
                {renderError('confirmEmail')}
                <p>Enter new password</p>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {renderError('password')}
                <p>Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {renderError('confirmPassword')}
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating your account...' : 'Register Now'}
                </button>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {renderError('submit')}
            </form>
        </div>
    );
};

export default RegisterUser;
