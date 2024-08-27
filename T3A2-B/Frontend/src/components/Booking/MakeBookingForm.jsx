import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import sessionState from "../../routes/store";
import SelectPetDropdown from "./SelectPetDropdown";
import SelectVetDropdown from "./SelectServiceDropdown";

const MakeBookingForm = () => {
  const userData = sessionState((state) => state.userData);
  const apiBase = sessionState((state) => state.apiBase);

  const [petSelect, setPetSelect] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [vetArray, setVetArray] = useState([]);
  const [vetSelect, setVetSelect] = useState("");
  const [errors, setErrors] = useState({});

  async function loadVets() {
    const loadedVets = await fetch(`${apiBase}/users/vets`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }

  const handlePetChange = (pet) => {
    setPetSelect(pet);
    setErrors((prevErrors) => ({ ...prevErrors, petSelect: "" }));
  };

  const handleServiceChange = (service) => {
    setServiceSelect(service);
    setErrors((prevErrors) => ({ ...prevErrors, serviceSelect: "" }));
  };

  const handleVetChange = (vet) => {
    setVetSelect(vet);
    setErrors((prevErrors) => ({ ...prevErrors, vetSelect: "" }));
  };

  const validatePet = () => {
    if (!petSelect) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        petSelect: "Please select a pet.",
      }));
      return false;
    }
    return true;
  };

  const validateService = () => {
    if (!serviceSelect) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        serviceSelect: "Please select an appointment type.",
      }));
      return false;
    }
    return true;
  };

  const validateVet = () => {
    if (!vetSelect) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vetSelect: "Please select a vet.",
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isPetValid = validatePet();
    const isServiceValid = validateService();
    const isVetValid = validateVet();

    if (isPetValid && isServiceValid && isVetValid) {
      // Submit form data to API
    }
  };

  return (
    <>
      <div id="select-pet">
        <p>Select Pet</p>
        <SelectPetDropdown
          handlePetChange={handlePetChange}
          setPetSelect={setPetSelect}
          petSelect={petSelect}
        />
        {errors.petSelect && <p style={{ color: "red" }}>{errors.petSelect}</p>}
      </div>
      <div id="select-apptType">
        <p>Select Appointment Type</p>
        <SelectVetDropdown
          handleServiceChange={handleServiceChange}
          serviceSelect={serviceSelect}
        />
        {errors.serviceSelect && (
          <p style={{ color: "red" }}>{errors.serviceSelect}</p>
        )}
      </div>
      <div id="select-vet">
        <p>Select your vet</p>
        <SelectVetDropdown
          handleVetChange={handleVetChange}
          vetSelect={vetSelect}
        />
      </div>
    </>
  );
};

export default MakeBookingForm;
