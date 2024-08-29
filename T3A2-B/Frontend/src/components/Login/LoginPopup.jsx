import React from "react";
import Popup from "reactjs-popup";
import LoginField from "./LoginField"
import sessionState from "../../routes/store";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";

const LoginPopup = ({trigger, closeOnDocumentClick}) => {
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  return (
    <Popup
      closeOnDocumentClick={closeOnDocumentClick == 'no' ? false : true}
      className="popup"
      modal

      position="right center"
      trigger={trigger ? trigger : ''}
    >
      <LoginField />
      <Link to={'/user/login'}>Register Account</Link>
    </Popup>
  );
};

export default LoginPopup;
