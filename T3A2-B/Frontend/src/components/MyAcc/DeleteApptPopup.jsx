import Popup from "reactjs-popup";
import LoginField from "../Login/LoginField";
import sessionState from "../../routes/store";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
// import { Link } from "react-router-dom";

const DeleteApptPopup = ({ appt, trigger, closeOnDocumentClick }) => {
  const token = sessionState((state) => state.token);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const setIsAuthenticated = sessionState((state) => state.setIsAuthenticated);
  const apiBase = sessionState((state) => state.apiBase);
  const deleteUserData = sessionState((state) => state.deleteUserData);

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const apptId = appt._id;

  async function deleteBooking(e) {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const response = await fetch(`${apiBase}/appointments/${apptId}`, {
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

        let deleteConfirmation = await response.json();
        setErrors((prevErrors) => ({ ...prevErrors, postError: "" }));
        setSubmitSuccess(true);

        deleteUserData(apptId, "appointments");

        console.log(
          "post register user data, this console log is in MakeBookingForm.jsx",
          userData
        );
      } catch (err) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          postError: err[err["error/s"]],
        }));
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
    >
      <h4>Deletion Confirmation</h4>
      <p>Are you sure you would like to delete this appointment?</p>

      {submitSuccess ? (
        <></>
      ) : (
        <>
          <button onClick={deleteBooking}>Confirm</button>
          <button>Cancel</button>
        </>
      )}

      {errors.postError ? (
        <p style={{ color: "red" }}>{errors.postError.toString()}</p>
      ) : (
        <></>
      )}
      {submitSuccess ? (
        <p style={{ color: "gray" }}>Successfully deleted appointment</p>
      ) : (
        <></>
      )}
      {isAuthenticated ? <></> : <LoginField />}
    </Popup>
  );
};

export default DeleteApptPopup;
