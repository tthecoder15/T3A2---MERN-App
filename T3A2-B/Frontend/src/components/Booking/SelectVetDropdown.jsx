import React from 'react'

const SelectVetDropdown = ({handleVetChange, vetSelect, vetsArray}) => {
  console.log('list of vets', vetsArray)  
  return (
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
  )
}

export default SelectVetDropdown