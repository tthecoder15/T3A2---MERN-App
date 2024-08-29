import React, { useState, useEffect } from "react";
import UpdateUserForm from "./UpdateUserForm";
import UpdateAppointmentForm from "./UpdateAppointmentForm";
import "./Account.css";
import RegisterPetForm from "./RegisterPetForm";
import sessionState from "../../routes/store";
import DisplayApptsDropdown from "./DisplayApptsDropdown";
import DisplaySingleAppt from "./DisplaySingleAppt";

const MyAccountDash = () => {
  const userData = sessionState((state) => state.userData);

  const [selectedSetting, setSelectedSetting] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true)

  const dropdownSelect = (text) => {
    if (selectedSetting === text) {
      setSelectedSetting("");
    } else {
      setSelectedSetting(text);
      setIsFormOpen(true);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
  }

  const [upcomingAppts, setUpcomingAppts] = useState([]);
  const [pastAppts, setPastAppts] = useState([]);

  const apptSort = () => {
    try {
      let upcDates = [];
      let oldDates = [];
      if ("appointments" in userData) {
        for (let appt of userData.appointments) {
          let dateNow = Date.now();
          let apptDate = new Date(appt.date);
          if (apptDate > dateNow) {
            upcDates.push(appt);
          } else {
            oldDates.push(appt);
          }
        }

        upcDates.sort((appt1, appt2) => {
          const a1Date = new Date(appt1.date);
          const a2Date = new Date(appt2.date);
          return a1Date - a2Date;
        });

        oldDates.sort((appt1, appt2) => {
          const a1Date = new Date(appt1.date);
          const a2Date = new Date(appt2.date);
          return a1Date - a2Date;
        });

        setUpcomingAppts(upcDates);
        setPastAppts(oldDates);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apptSort();
  }, [userData]);

  const renderInputSection = () => {
    switch (selectedSetting) {
      case "Personal Information":
        return <UpdateUserForm />;
      case "Upcoming Appointments":
        return <UpdateAppointmentForm upcomingAppts={upcomingAppts}/>;
      case "Pet Information":
        return <RegisterPetForm />;
      case "Appointment History":
        return (
          <DisplayApptsDropdown
            upcomingAppts={upcomingAppts}
            pastAppts={pastAppts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="UpdateAccount">
        <div>
          <h5>Personal Information</h5>
          <ul>
            <li>Your phone number: {userData.phNumber}</li>
            <li>Your email address: {userData.email}</li>
          </ul>
          <p>
            Use the button below to update the above information and your
            password.
          </p>
          <button
            className="UpdateAccount"
            onClick={() => dropdownSelect("Personal Information")}
          >
            {selectedSetting === "Personal Information"
              ? "Close Update Information Field"
              : "Update Personal Information"}
          </button>
        </div>
        <div>
          <h5>Upcoming Appointments</h5>
          <h6>Next Appointment: </h6>
          <DisplaySingleAppt appt={upcomingAppts[0]} />
          <button onClick={() => dropdownSelect("Upcoming Appointments")}>
            {selectedSetting === "Upcoming Appointments"
              ? "Close Update Appointments Field"
              : "Update Appointment"}
          </button>
        </div>
        <div>
          <h5>Pet Information</h5>
          {userData.pets.map((pet) => {
            return (
              <div key={pet.petName}>
                <h6>{pet.petName}</h6>
                <p>Born: {pet.birthYear}</p>
                <p>Breed: {pet.breed}</p>
              </div>
            );
          })}
          <button onClick={() => dropdownSelect("Pet Information")}>
            {selectedSetting === "Pet Information"
              ? "Close Pet Registration Field"
              : "Register new pet"}
          </button>
        </div>
        <div>
          <h5>Appointment History</h5>
          <h6>Most Recent Appointment: </h6>
          <DisplaySingleAppt appt={pastAppts[pastAppts.length - 1]} />
          <button onClick={() => dropdownSelect("Appointment History")}>
            {selectedSetting === "Appointment History"
              ? "Close Appointment History Field"
              : "See More.."}
          </button>
        </div>
      </div>
      <div>{renderInputSection()}</div>
    </div>
  );
};

export default MyAccountDash;
