import React from 'react'
import { Dropdown } from 'react-bootstrap'

const SelectVetDropdown = ({handleVetChange, vetSelect, vetArray}) => {
  return (
    <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {vetSelect.vetName || 'Select Vet'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {vetArray ? vetArray.map((vet) => {
              return <Dropdown.Item onClick={() => handleVetChange(vet)} key={vet.vetName}>{vet.vetName}</Dropdown.Item>
            }) : <></>}
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default SelectVetDropdown