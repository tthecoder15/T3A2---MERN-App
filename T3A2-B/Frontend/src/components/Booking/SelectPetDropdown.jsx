import React from "react";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import sessionState from "../../routes/store";
import RegisterPetPopup from "./RegisterPetPopup";

const SelectPetDropdown = ({ petSelect, handlePetChange }) => {
  const userData = sessionState((state) => state.userData);
  const [popupOpen, setPopupOpen] = useState(false);

  const clickRegPet = () => {
    setTimeout(() => {
      setPopupOpen(true);
    }, 200);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {petSelect.petName
            ? petSelect.petName
            : petSelect == "Register New Pet"
            ? "Register New Pet"
            : "Select Pet"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {userData.pets ? (
            userData.pets.map((pet) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    //  setRegisterPet(false),

                    handlePetChange(pet);
                  }}
                  key={pet.petName}
                >
                  {pet.petName}
                </Dropdown.Item>
              );
            })
          ) : (
            <></>
          )}
          <Dropdown.Item
            onClick={() => {
              handlePetChange("Register New Pet");
              clickRegPet();
            }}
          >
            Register New Pet
          </Dropdown.Item>
          {popupOpen ? (
            <RegisterPetPopup
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />
          ) : (
            <></>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectPetDropdown;
