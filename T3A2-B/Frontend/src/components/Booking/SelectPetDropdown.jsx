import React from "react";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import sessionState from "../../routes/store";
import RegisterPetForm from "../MyAcc/RegisterPetForm";

const SelectPetDropdown = ({ handlePetChange, petSelect, setPetSelect }) => {
  const userData = sessionState((state) => state.userData);
  const [registerPet, setRegisterPet] = useState(false);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {petSelect || "Select Pet"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {userData ? (
            userData.pets.map((pet) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    handlePetChange(`${pet.petName}`), setRegisterPet(false);
                  }}
                >
                  {pet.petName}
                </Dropdown.Item>
              );
            })
          ) : (
            <></>
          )}
          <Dropdown.Item onClick={() => {handlePetChange(`Register New Pet`), setRegisterPet(true);}}>
            Register New Pet
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {registerPet ? <RegisterPetForm /> : <></>}
    </div>
  );
};

export default SelectPetDropdown;
