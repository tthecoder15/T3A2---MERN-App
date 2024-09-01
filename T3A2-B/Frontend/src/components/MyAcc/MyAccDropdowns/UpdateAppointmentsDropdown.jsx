import React from "react";
import DisplaySingleAppt from "../DisplaySingleAppt";

const UpdateAppointmentsDropdown = ({ upcomingAppts }) => {
  return (
    <div className="update-account-box">
      <h5>Upcoming Appointments</h5>

      {upcomingAppts ? (
        upcomingAppts.map((appt) => {
          return (
            <DisplaySingleAppt appt={appt} key={appt._id} updateB={true} deleteB={true} />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default UpdateAppointmentsDropdown;
