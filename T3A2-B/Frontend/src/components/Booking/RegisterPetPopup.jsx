import React, { useLayoutEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import RegisterPetForm from "../MyAcc/RegisterPetForm"


const RegisterPetPopup = ({popupOpen, setPopupOpen, trigger, closeOnDocumentClick}) => {
  console.log(popupOpen)
  return (
    <Popup
      closeOnDocumentClick={closeOnDocumentClick == 'no' ? false : true}
      className="popup"
      modal
      position="right center"
      trigger={trigger ? trigger : ''}
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
    >
      <RegisterPetForm/>
    </Popup>
  );
};

export default RegisterPetPopup;
