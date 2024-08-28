import React, { useState } from "react";
import { Link } from "react-router-dom";
import MakeBookingForm from "../components/Booking/MakeBookingForm";
import sessionState from "./store";
import LoginPopup from "../components/Login/LoginPopup";
import '../components/Booking/booking.css'

const Booking = () => {
  const userData = sessionState((state) => state.userData);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);

  const [showPopup, setShowPopup] = useState(false)

  const loginButtonClick = () => {
    setShowPopup(true)
  }

  console.log(userData)
  return (
    
    <>
      <div className="contentFrame">
        <h2>Book Your Appointment</h2>
        <div className="bookingFrame">
          <div>
            {userData.firstName ? (
              <p>Hello {userData.firstName}, to make an appointment, please fill in the following form.</p>
            ) : (
              <p>Hello, to book an appointment, please log in or register: </p>
            )}
            {isAuthenticated ? <></> : <button onClick={loginButtonClick}>Login/Register</button>}
            {showPopup ? <LoginPopup/> : <></>}
          </div>
          <MakeBookingForm setShowPopup={setShowPopup}/>
        </div>
      </div>
    </>
  );
};

export default Booking;
