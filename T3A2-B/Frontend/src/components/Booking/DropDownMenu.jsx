import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const DropDownMenu = () => {
    const [petSelect, setPetSelect] = useState('')
    const [serviceSelect, setServiceSelect] = useState('')
    const [vetSelect, setVetSelect] = useState('')
    const [errors, setErrors] = useState({})

    const handlePetChange = (pet) => {
        setPetSelect(pet)
        setErrors((prevErrors) => ({ ...prevErrors, petSelect: ''}))
    }

    const handleServiceChange = (service) => {
        setServiceSelect(service)
        setErrors((prevErrors) => ({...prevErrors, serviceSelect: ''}))
    }

    const handleVetChange = (vet) => {
        setVetSelect(vet)
        setErrors((prevErrors) => ({...prevErrors, vetSelect: ''}))
    }

    const validatePet = () => {
        if (!petSelect) {
            setErrors((prevErrors) => ({
                ...prevErrors, 
                petSelect: 'Please select a pet.'
            }))
            return false
        }
        return true
    }

    const validateService = () => {
        if(!serviceSelect) {
            setErrors((prevErrors) => ({
               ...prevErrors, 
                serviceSelect: 'Please select an appointment type.'
            }))
            return false
        }
        return true
    }

    const validateVet = () => {
        if(!vetSelect) {
            setErrors((prevErrors) => ({
               ...prevErrors, 
                vetSelect: 'Please select a vet.'
            }))
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isPetValid = validatePet()
        const isServiceValid = validateService()
        const isVetValid = validateVet()

        if(isPetValid && isServiceValid && isVetValid) {
            // Submit form data to API
        }
    }

  return (
    <>
        <div>
            <p>Select Pet</p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {petSelect || 'Select Pet'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handlePetChange("Max")}>Max</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePetChange("Greg")}>Greg</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePetChange("Rapunzel")}>Rapunzel</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {errors.petSelect && <p style={{ color : 'red' }}>{errors.petSelect}</p>}
        </div>
        <div>
            <p>Select Appointment Type</p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {serviceSelect || 'Select Appointment Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleServiceChange("Check-up")}>Check-up</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleServiceChange("Dental Service")}>Dental Service</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleServiceChange("Vaccination")}>Vaccination</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleServiceChange("Surgery")}>Surgery</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {errors.serviceSelect && <p style={{ color : 'red' }}>{errors.serviceSelect}</p>}
        </div>
        <div>
            <p>Select your vet</p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {vetSelect || 'Select Vet'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleVetChange("Dr. Kim")}>Dr. Kim</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleVetChange("Dr. Walker")}>Dr. Walker</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleVetChange("Dr. Taylor")}>Dr. Taylor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </>
  )
}

export default DropDownMenu