import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import sessionState from "../../routes/store";
import { jwtDecode } from "jwt-decode";
import LoginPopup from "../Popups/LoginPopup"

// makePopupClose is an optional parameter if RegisterPetForm is used in a popup
const RegisterPetForm = ({ makePopupClose }) => {
  const apiBase = sessionState((state) => state.apiBase);
  const token = sessionState((state) => state.token);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const setIsAuthenticated = sessionState((state) => state.setIsAuthenticated);
  const setUserData = sessionState((state) => state.setUserData);

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [petYear, setPetYear] = useState("");
  const [errors, setErrors] = useState({});

  let userId;
  if (token) {
    userId = jwtDecode(token).userId;
  }

  const handleNameChange = (e) => {
    setPetName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, nameError: "" }));
  };

  const validatePetName = () => {
    if (petName == "" || petName == "Enter Name" || petName.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError:
          "Please enter your pet's name. It must be at least 2 characters.",
      }));
      return false;
    }
    return true;
  };

  const handleAnimalTypeChange = (type) => {
    setAnimalType(type);
    setErrors((prevErrors) => ({
      ...prevErrors,
      animalType: "",
    }));
  };

  const validateAnimalType = () => {
    if (!animalType) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        animalType: "Please select an animal type.",
      }));
      return false;
    }
    return true;
  };

  const handleYearChange = (e) => {
    if (/^\d{0,4}$/.test(e.target.value)) {
      setPetYear(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, yearError: "" }));
    }
  };

  const validateYear = () => {
    if (petYear && (petYear < 1950 || petYear > new Date().getFullYear())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        yearError: "Please enter a valid year.",
      }));
      return false;
    }
    return true;
  };

  const handleBreedChange = (e) => {
    setPetBreed(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, breedError: "" }));
  };
  const validateBreed = () => {
    if (petBreed == "" || petBreed == "Enter Breed") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        breedError: "Please enter your pet's breed.",
      }));
      return false;
    }
    return true;
  };

  async function postNewPet(e) {
    e.preventDefault();
    const isYearValid = validateYear();
    const isAnimalTypeValid = validateAnimalType();
    const isBreedValid = validateBreed();
    const isNameValid = validatePetName();

    if (isYearValid && isAnimalTypeValid && isBreedValid && isNameValid) {
      try {
        const response = await fetch(`${apiBase}/pets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            petName: petName,
            breed: petBreed,
            birthYear: petYear,
            animalType: animalType.toLowerCase(),
            userId: userId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          if (errorData["error/s"] == "invalid_token") {
            setIsAuthenticated(false);
          }
          throw errorData;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          postError: "",
          submitSuccess: true,
        }));

        let submittedPet = await response.json();
        setUserData({ pets: submittedPet });

        // If register pet is called as a popup, successful register closes popup
        if (makePopupClose) {
          makePopupClose();
        }
      } catch (err) {
        if (err["error/s"] == "invalid_token") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            submitSuccess: false,
            postError: "Please log in and try again.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            submitSuccess: false,
            postError: err[err["error/s"]],
          }));
        }
      }
    }
  }

  return (
    <div className="RegisterPetBox">
      <h5>Register Pet</h5>
      <div id="name-input">
        <p>Enter your pet's name:</p>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={handleNameChange}
        />
        {errors.nameError && <p style={{ color: "red" }}>{errors.nameError}</p>}
      </div>
      <div id="year-input">
        <p>Enter the year your pet was born:</p>
        <input
          type="number"
          value={petYear}
          onChange={handleYearChange}
          placeholder="Enter Year"
          max={new Date().getFullYear()}
        />
        {errors.yearError && <p style={{ color: "red" }}>{errors.yearError}</p>}
      </div>
      <div id="type-input">
        <p>Select your pet's type:</p>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {animalType || "Select Animal Type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {["Dog", "Cat", "Other"].map((animalType) => (
              <Dropdown.Item
                key={animalType}
                onClick={() => handleAnimalTypeChange(animalType)}
              >
                {animalType}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {errors.animalType && <p style={{ color: "red" }}>{errors.animalType}</p>}
      <div id="breed-input">
        <p>Enter your pet's breed:</p>
        <input
          type="text"
          placeholder="Enter Breed"
          onChange={handleBreedChange}
        />
        {errors.breedError ? (
          <p style={{ color: "red" }}>{errors.breedError.toString()}</p>
        ) : (
          <></>
        )}
      </div>
      <div id="submit-input">
        {isAuthenticated != true ? (
          <LoginPopup trigger={() => <button>Register Pet</button>} />
        ) : (
          <button type="submit" onClick={postNewPet}>
            Register Pet
          </button>
        )}
        {errors.postError ? (
          <p style={{ color: "red" }}>{errors.postError.toString()}</p>
        ) : null}
        {errors.submitSuccess ? (
          <p style={{ color: "gray" }}>Successfully registered pet!</p>
        ) : null}
      </div>
    </div>
  );
};

export default RegisterPetForm;
