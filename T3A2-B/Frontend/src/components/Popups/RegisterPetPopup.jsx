import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import RegisterPetForm from "../RegisterForms/RegisterPetForm";

const RegisterPetPopup = ({
  popupIsOpen,
  makePopupClose,
  trigger,
  closeOnDocumentClick,
}) => {
  return (
    <Popup
      closeOnDocumentClick={closeOnDocumentClick == "no" ? false : true}
      className="popup"
      modal
      position="right center"
      trigger={trigger ? trigger : ""}
      open={popupIsOpen}
      onClose={makePopupClose}
    >
      <RegisterPetForm makePopupClose={makePopupClose} />
    </Popup>
  );
};

export default RegisterPetPopup;
