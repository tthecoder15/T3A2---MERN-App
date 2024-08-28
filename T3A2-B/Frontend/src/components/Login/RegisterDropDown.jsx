import React, { useState } from 'react'
import RegisterUser from './RegisterUser'

const RegisterDropDown = () => {
    const [registerField, setRegisterField] = useState("")  
    const [isOpen, setIsOpen] = useState(false)  
    const [successMessage, setSuccessMessage] = useState('');  

    const dropdownSelect = () => {
        if (isOpen) {
            setRegisterField("");  // Clear the form when closing
        } else {
            setRegisterField("User");  // Set to "User" when opening the form
        }
        setIsOpen(!isOpen);  // Toggle the open state
    }

    const handleSuccess = (message) => {
        setSuccessMessage(message);  // Set the success message
        setIsOpen(false);  // Close the form
    }

    const renderRegisterField = () => {
        if (isOpen) {
            return <RegisterUser onSuccess={handleSuccess} />;
        }
        return null;
    }

    return (
        <div>
            <button onClick={dropdownSelect}>
                {isOpen ? "Close register form" : "Register Now"}
            </button>
            <div>{renderRegisterField()}</div>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    )
}

export default RegisterDropDown