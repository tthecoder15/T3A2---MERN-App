import React from 'react'
import { Dropdown } from 'react-bootstrap'

const SelectVetDropdown = ({handleVetChange, vetSelect, vetArray}) => {
  console.log('list of vets', vetArray)  
  return (
    <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {vetSelect || 'Select Vet'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {vetArray ? vetArray.map((vet) => {
              return <Dropdown.Item onClick={() => handleVetChange(vet.vetName)} key={vet.vetName}>{vet.vetName}</Dropdown.Item>
            }) : <></>}
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default SelectVetDropdown