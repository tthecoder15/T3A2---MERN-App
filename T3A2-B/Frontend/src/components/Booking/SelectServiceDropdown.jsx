import React from 'react'
import { Dropdown } from 'react-bootstrap'

const SelectServiceDropdown = ({serviceSelect, handleServiceChange}) => {
  return (
    <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {serviceSelect.charAt(0).toUpperCase() + serviceSelect.slice(1) || 'Select Appointment Type'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleServiceChange("Check-up")}>Check-up</Dropdown.Item>
            <Dropdown.Item onClick={() => handleServiceChange("Dental")}>Dental</Dropdown.Item>
            <Dropdown.Item onClick={() => handleServiceChange("Vaccination")}>Vaccination</Dropdown.Item>
            <Dropdown.Item onClick={() => handleServiceChange("Surgery")}>Surgery</Dropdown.Item>
            <Dropdown.Item onClick={() => handleServiceChange("Other")}>Other</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default SelectServiceDropdown