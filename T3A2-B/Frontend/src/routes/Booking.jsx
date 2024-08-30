import React from "react";
import MakeBookingForm from "../components/Booking/MakeBookingForm";
import sessionState from "./store";
import LoginPopup from "../components/Popups/LoginPopup";
import "../components/Booking/booking.css";

const Booking = () => {
  const userData = sessionState((state) => state.userData);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);

  console.log(userData);
  return (
    <>
      <div className="contentFrame">
        <div>
          <h2>Book Your Appointment</h2>
          <div className="bookingFrame">
            <div>
              {userData.firstName ? (
                <p>
                  Hello {userData.firstName}, to make an appointment, please
                  fill in the following form.
                </p>
              ) : (
                <p>To book an appointment, please log in or register: </p>
              )}
              {isAuthenticated ? (
                <></>
              ) : (
                <LoginPopup
                  trigger={() => (
                    <button className="button booking-select">
                      Login/Register
                    </button>
                  )}
                />
              )}
            </div>
            <MakeBookingForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
