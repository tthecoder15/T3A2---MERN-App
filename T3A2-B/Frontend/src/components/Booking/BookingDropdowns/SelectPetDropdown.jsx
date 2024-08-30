import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import sessionState from "../../../routes/store";
import RegisterPetPopup from "../../Popups/RegisterPetPopup";

const SelectPetDropdown = ({ petSelect, handlePetChange }) => {
  const userData = sessionState((state) => state.userData);

  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const makePopupOpen = () => {
    setTimeout(() => {
      setPopupIsOpen(true);
    }, 200);
  };

  const makePopupClose = () => {
    setPopupIsOpen(false);
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
              // clickRegPet();
              makePopupOpen();
            }}
          >
            Register New Pet
          </Dropdown.Item>
          <RegisterPetPopup
            popupIsOpen={popupIsOpen}
            makePopupClose={makePopupClose}
          />

          {/* {popupIsOpen ? (
            <RegisterPetPopup
              popupIsOpen={popupIsOpen}
              setPopupIsOpen={setPopupIsOpen}
            />
          ) : (
            <></>
          )} */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectPetDropdown;
