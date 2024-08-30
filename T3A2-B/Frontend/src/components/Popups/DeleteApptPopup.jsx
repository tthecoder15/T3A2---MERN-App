import Popup from "reactjs-popup";
import LoginField from "../Login/LoginField";
import sessionState from "../../routes/store";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

const DeleteApptPopup = ({
  appt,
  popupIsOpen,
  makePopupClose,
  trigger,
  closeOnDocumentClick,
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

  async function deleteBooking(e) {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const response = await fetch(`${apiBase}/appointments/${appt._id}`, {
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

        setErrors((prevErrors) => ({
          ...prevErrors,
          postError: "",
          submitSuccess: true,
        }));
        
        deleteUserData(appt._id, "appointments");
        makePopupClose();

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
      closeOnDocumentClick={closeOnDocumentClick == "no" ? false : true}
      className="popup"
      modal
      position="right center"
      trigger={trigger ? trigger : ""}
      onClose={makePopupClose}
      onOpen={popupOpenHandle}
      open={popupIsOpen}
    >
      <h4>Deletion Confirmation</h4>
      <p>Are you sure you would like to delete this appointment?</p>

      {errors.submitSuccess ? (
        null
      ) : (
        <>
          <button onClick={deleteBooking}>Confirm</button>
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

export default DeleteApptPopup;
