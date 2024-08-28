import React from "react";
import Popup from "reactjs-popup";
import LoginField from "./LoginField";
import sessionState from "../../routes/store";
import "reactjs-popup/dist/index.css";
import RegisterUser from "./RegisterUser";
import { Link } from "react-router-dom";

const LoginPopup = ({closeOnDocumentClick}) => {
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  return (
    <Popup
      closeOnDocumentClick={closeOnDocumentClick == 'no' ? false : true}
      className="popup"
      modal
      open={!isAuthenticated}
      position="right center"
    >
      <LoginField />
      <Link to={'/user/login'}>Register Account</Link>
    </Popup>
  );
};

export default LoginPopup;
