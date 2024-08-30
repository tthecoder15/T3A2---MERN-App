import React from "react";
import DisplaySingleAppt from "../DisplaySingleAppt";

const UpdateAppointmentsDropdown = ({ upcomingAppts }) => {
  return (
    <div className="UpdateAccountBox">
      <h5>Upcoming Appointments</h5>

      {upcomingAppts ? (
        upcomingAppts.map((appt) => {
          return (
            <DisplaySingleAppt appt={appt} updateB={true} deleteB={true} />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default UpdateAppointmentsDropdown;
