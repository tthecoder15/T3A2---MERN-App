import React from "react";
import { Link } from "react-router-dom";
import sessionState from "../../routes/store";
import DisplaySingleAppt from "./DisplaySingleAppt";

const UpcomingAppointments = ({ upcomingAppts }) => {
  return (
    <div className="UpdateAccountBox">
      <h5>Upcoming Appointments</h5>

      {upcomingAppts ? (
        upcomingAppts.map((appt) => {
          return <DisplaySingleAppt appt={appt} updateB={true} deleteB={true} />;
        })
      ) : (
        <></>
      )}

      {/* <Link to="/booking">Book now</Link> */}
    </div>
  );
};

export default UpcomingAppointments;
