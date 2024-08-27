import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import sessionState from "../../routes/store";
import SelectPetDropdown from "./SelectPetDropdown";
import SelectServiceDropdown from "./SelectServiceDropdown"
import SelectVetDropdown from "./SelectVetDropdown";
import BookingCalendar from "./BookingCalendar";

const MakeBookingForm = () => {
  const userData = sessionState((state) => state.userData);
  const apiBase = sessionState((state) => state.apiBase);

  const [petSelect, setPetSelect] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [vetArray, setVetArray] = useState([]);
  const [vetSelect, setVetSelect] = useState("");
  const [timeSelect, setTimeSelect] = useState("")
  const [errors, setErrors] = useState({});

  // Loads vets for populating the choices of vets and their appointments
  // Load effect calls this upon the page loading
  async function loadVets() {
    const response = await fetch(`${apiBase}/vets-list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
    }

    const retVets = await response.json()
    setVetArray(await retVets)
    console.log("Here's the vet endpoint return", await vetArray)
  }

  // Calls loadVets on load
  useEffect(() => {loadVets()}, [])

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

  const validateTime = () => {
    if (!timeSelect) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeSelect: "Please select a vet.",
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
    const isTimeValid = validateTime()

    if (isPetValid && isServiceValid && isVetValid && isTimeValid) {
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
        <SelectServiceDropdown handleServiceChange={handleServiceChange}
          serviceSelect={serviceSelect}/>
        {errors.serviceSelect && (
          <p style={{ color: "red" }}>{errors.serviceSelect}</p>
        )}
      </div>
      <div id="select-vet">
        <p>Select your vet</p>
        <SelectVetDropdown
          handleVetChange={handleVetChange}
          vetSelect={vetSelect}
          vetArray={vetArray}
        />
      </div>
      <div>
        <p>Choose your time slot:</p>
        <BookingCalendar vetArray={vetArray} vetSelect={vetSelect} setTimeSelect={setTimeSelect}/>
      </div>
    </>
  );
};

export default MakeBookingForm;
