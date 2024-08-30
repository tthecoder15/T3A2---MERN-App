import React, { useState } from 'react'
import RegisterUser from '../RegisterForms/RegisterUser'

const RegisterDropDown = () => {
    const [registerField, setRegisterField] = useState("")  
    const [isOpen, setIsOpen] = useState(false)  
    const [successMessage, setSuccessMessage] = useState('');  

    const dropdownSelect = () => {
        if (isOpen) {
            // Clear the form when closing
            setRegisterField("");  
        } else {
            // Set to "User" when opening the form
            setRegisterField("User");  
        }
        // Toggle the open state
        setIsOpen(!isOpen);  
    }

    const handleSuccess = (message) => {
        // Set the success message
        setSuccessMessage(message);
        // Close the form
        setIsOpen(false);
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