import React, { useLayoutEffect } from "react";
import Popup from "reactjs-popup";
import LoginField from "../Login/LoginField"
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import sessionState from "../../routes/store";

const LoginPopup = ({showLoginPopup, setShowLoginPopup}) => 
    {
      const isAuthenticated = sessionState((state) => state.isAuthenticated);

      const makePopupClose = () => {
         setShowLoginPopup(false)
      }

      useLayoutEffect(() => {
        if (isAuthenticated) {
          setShowLoginPopup(false)
        }
      }, 
      [isAuthenticated])

  return (
    <Popup
      closeOnDocumentClick={false}
      className="popup"
      modal
      position="right center"
      onClose={makePopupClose}
      open={showLoginPopup}
    >
      
      <LoginField />
      <p>Please login and try again.</p>
      <div id="submit-input">
        <button type='submit' onClick={makePopupClose}>Cancel</button>
      </div>
      <Link to={'/user/login'}>Register Account</Link>
    </Popup>
  );
};

export default LoginPopup;
