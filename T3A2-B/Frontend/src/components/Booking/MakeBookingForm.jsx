import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import sessionState from "../../routes/store";
import BookingCalendar from "./BookingCalendar";
import SelectPetDropdown from "./BookingDropdowns/SelectPetDropdown";
import SelectServiceDropdown from "./BookingDropdowns/SelectServiceDropdown";
import SelectVetDropdown from "./BookingDropdowns/SelectVetDropdown";
import LoginPopup from "../Popups/LoginPopup";

const MakeBookingForm = () => {
  const token = sessionState((state) => state.token);
  let userId;
  if (token) {
    userId = jwtDecode(token).userId;
  }

  const userData = sessionState((state) => state.userData);
  const setUserData = sessionState((state) => state.setUserData);
  const apiBase = sessionState((state) => state.apiBase);
  const setIsAuthenticated = sessionState((state) => state.setIsAuthenticated);

  const [petSelect, setPetSelect] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [vetArray, setVetArray] = useState([]);
  const [vetSelect, setVetSelect] = useState("");
  const [timeSelect, setTimeSelect] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [jwtExpired, setJwtExpired] = useState(false);

  // Loads vets for populating the choices of vets and their appointments
  // Load effect calls this upon the page loading
  async function loadVets() {
    const response = await fetch(`${apiBase}/vets-list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      setVetArray("");
      console.log(errorData);
    }

    const retVets = await response.json();
    setVetArray(retVets);
  }

  // Calls loadVets on load
  useEffect(() => {
    loadVets();
  }, [userData]);

  const handlePetChange = (pet) => {
    setPetSelect(pet);
    setErrors((prevErrors) => ({ ...prevErrors, petSelect: "" }));
  };

  const handleServiceChange = (service) => {
    setServiceSelect(service.toLowerCase());
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
        timeSelect: "Please select a time.",
      }));
      return false;
    }
    return true;
  };

  async function postNewBooking(e) {
    e.preventDefault();
    const isPetValid = validatePet();
    const isServiceValid = validateService();
    const isVetValid = validateVet();
    const isTimeValid = validateTime();

    if (isPetValid && isServiceValid && isVetValid && isTimeValid) {
      try {
        // Set "submitting" error to true so it displays to user
        setErrors((prevErrors) => ({
          ...prevErrors,
          submitting: true
        }));

        const response = await fetch(`${apiBase}/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            petId: petSelect._id,
            vetId: vetSelect._id,
            userId: userId,
            appointmentType: serviceSelect,
            date: timeSelect,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          if (errorData["error/s"] == "invalid_token") {
            setIsAuthenticated(false);
            setJwtExpired(true);
          }
          throw errorData;
        }

        let submittedAppointment = await response.json();

        // Alter submitted Appointment object to made log in population
        submittedAppointment.petId = petSelect;
        submittedAppointment.vetId = vetSelect;
        setErrors((prevErrors) => ({ ...prevErrors, postError: "", submitting: "" }));
        setSubmitSuccess(true);
        setUserData({ appointments: submittedAppointment });
      } catch (err) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          postError: err[err["error/s"]],
        }));
      }
    }
  }

  return (
    <>
      <div id="select-pet" className="booking-select">
        <p>Select Pet</p>
        <SelectPetDropdown
          handlePetChange={handlePetChange}
          petSelect={petSelect}
        />
        {errors.petSelect && <p style={{ color: "red" }}>{errors.petSelect}</p>}
      </div>
      <div id="select-apptType" className="booking-select">
        <p>Select Appointment Type</p>
        <SelectServiceDropdown
          handleServiceChange={handleServiceChange}
          serviceSelect={serviceSelect}
        />
        {errors.serviceSelect && (
          <p style={{ color: "red" }}>{errors.serviceSelect}</p>
        )}
      </div>
      <div id="select-vet" className="booking-select">
        <p>Select your vet</p>
        <SelectVetDropdown
          handleVetChange={handleVetChange}
          vetSelect={vetSelect}
          vetArray={vetArray}
        />
      </div>
      <div className="calendar">
        <p>Choose your time slot:</p>
        <BookingCalendar
          vetArray={vetArray}
          vetSelect={vetSelect}
          setTimeSelect={setTimeSelect}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
        />
      </div>
      <div id="submit-booking-button">
        <button onClick={postNewBooking}>Submit Booking</button>
        {errors.submitting ? <p style={{ color: "gray" }}>Request submitted, please wait.</p> : null}
        {errors.postError ? (
          <p style={{ color: "red" }}>{errors.postError.toString()}</p>
        ) : null}
        {submitSuccess ? (
          <p style={{ color: "gray" }}>Successfully registered appointment!</p>
        ) : null}
        {jwtExpired ? (
          <LoginPopup
            popupControl={jwtExpired}
            setPopupControl={setJwtExpired}
          />
        ) : null}
      </div>
    </>
  );
};

export default MakeBookingForm;
