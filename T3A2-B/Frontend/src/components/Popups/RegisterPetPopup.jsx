import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import RegisterPetForm from "../RegisterForms/RegisterPetForm";

const RegisterPetPopup = ({ popupIsOpen, makePopupClose }) => {
  return (
    <Popup
      closeOnDocumentClick={false}
      className="popup"
      modal
      position="right center"
      open={popupIsOpen}
      onClose={makePopupClose}
    >
      <RegisterPetForm makePopupClose={makePopupClose} />
    </Popup>
  );
};

export default RegisterPetPopup;
