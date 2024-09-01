import Popup from "reactjs-popup";
import LoginField from "../Login/LoginField";
import sessionState from "../../routes/store";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

const DeletePetPopup = ({
  pet,
  popupIsOpen,
  makePopupClose,
}) => {
  const token = sessionState((state) => state.token);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const setIsAuthenticated = sessionState((state) => state.setIsAuthenticated);
  const apiBase = sessionState((state) => state.apiBase);
  const deleteUserData = sessionState((state) => state.deleteUserData);

  const [errors, setErrors] = useState({});

  const popupOpenHandle = () => {
    setErrors({})
  };

  async function deletePet(e) {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        // Set "submitting" error to true so it displays to user
        setErrors((prevErrors) => ({
            ...prevErrors,
            submitting: true
          }));

        const response = await fetch(`${apiBase}/pets/${pet._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          if (errorData["error/s"] == "invalid_token") {
            setIsAuthenticated(false);
          }
          throw errorData;
        }

        if (response.ok) {
            setErrors((prevErrors) => ({
            ...prevErrors,
            postError: "",
            submitSuccess: true,
            }))
            deleteUserData(pet._id, "pets")
            makePopupClose()
        };

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
    <Popup
    closeOnDocumentClick={false}
      className="popup"
      modal
      position="right center"
      onClose={makePopupClose}
      onOpen={popupOpenHandle}
      open={popupIsOpen}
    >
      <h4>Deletion Confirmation</h4>
      <p>Are you sure you would like to delete this pet? Doing so will remove all appointments linked to this pet.</p>
      {errors.submitting ? <p style={{ color: "gray" }}>Request submitted, please wait.</p> : null}
      
      {errors.submitSuccess ? (
        null
      ) : (
        <>
          <button onClick={deletePet}>Confirm</button>
          <button onClick={makePopupClose}>Cancel</button>
        </>
      )}

      {errors.postError ? (
        <p style={{ color: "red" }}>{errors.postError.toString()}</p>
      ) : (
        null
      )}
      {errors.submitSuccess ? (
        <p style={{ color: "gray" }}>Successfully deleted appointment</p>
      ) : (
        null
      )}
      {isAuthenticated ? <></> : <LoginField />}
    </Popup>
  );
};

export default DeletePetPopup;
