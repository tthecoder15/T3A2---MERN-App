import React, { useLayoutEffect } from "react";
import Popup from "reactjs-popup";
import LoginField from "../Login/LoginField"
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import sessionState from "../../routes/store";
import { Navigate } from "react-router-dom";

const LoginPopup = ({popupControl, setPopupControl}) => 
    {
      const isAuthenticated = sessionState((state) => state.isAuthenticated);
      const navigate = useNavigate()

      const makePopupClose = () => {
         setPopupControl(false)
      }

      useLayoutEffect(() => {
        if (isAuthenticated) {
          setPopupControl(false)
        }
      }, 
      [isAuthenticated])

      const registerClick = () => {
        navigate('/user/login')
      }

  return (
    <Popup
      closeOnDocumentClick={false}
      className="popup"
      modal
      position="right center"
      onClose={makePopupClose}
      open={popupControl}
    >
      
      <LoginField />
      <p>Please login and try again.</p>
      <div id="submit-input">
        <button type='submit' onClick={makePopupClose}>Cancel</button>
      </div>
        <button onClick={registerClick}>Register Account</button>
    </Popup>
  );
};

export default LoginPopup;
