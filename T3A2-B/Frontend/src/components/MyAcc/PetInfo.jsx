import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'

const PetInfo = () => {
    const [animalType, setAnimalType] = useState('')
    const [year, SetYear] = useState('')
    const [errors, setErrors] = useState({})

    const handleAnimalTypeChange = (type) => {
        setAnimalType(type)
        setErrors((prevErrors) => ({ ...prevErrors, animalType: ''}))
    }

    const handleYearChange = (e) => {
        const yearValue = e.target.value
        if (/^\d{0,4}$/.test(yearValue)) {
            SetYear(yearValue)
            setErrors((prevErrors) => ({ ...prevErrors, year: ''}))
        }
    }

    const validateYear = () => {
        if (year && (year < 1000 || year > new Date().getFullYear())) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                year: 'Please enter a valid year.'
            }))
            return false
        }
        return true
    }

    const validateAnimalType = () => {
        if (!animalType) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                animalType: 'Please select an animal type.'
            }))
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
            // Submit form data to API
        const isYearValid = validateYear()
        const isAnimalTypeValid = validateAnimalType()

        if (isYearValid && isAnimalTypeValid) {
            onSubmit({ animalType, year })
        }
    }

  return (
          <div className="UpdateAccountBox">
            <h5>Pet Information</h5>
            <p>Enter your pets name:</p>
            <input 
                type="text" 
                placeholder="Max" 
            />
            <p>Enter the year your pet was born:</p>
            <input 
                type="number"
                value={year}
                onChange={handleYearChange}
                placeholder='YYYY'
                max="9999" 
            />
            {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}
            <p>What is your pets animal type?</p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {animalType || 'Select Animal Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAnimalTypeChange("Dog")}>Dog</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAnimalTypeChange("Cat")}>Cat</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAnimalTypeChange("Other")}>Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {errors.animalType && <p style={{ color: 'red' }}>{errors.animalType}</p>}
            <p>Enter the breed of your pet:</p>
            <input 
                type="text" 
                placeholder="Labrador"
            />
            <button 
                type="submit"
                onClick={handleSubmit}
            >Register Pet</button>
          </div>
        )
}

PetInfo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default PetInfo