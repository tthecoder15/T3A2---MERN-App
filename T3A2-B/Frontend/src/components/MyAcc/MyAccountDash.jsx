import React, { useState } from 'react'
import UpdateUserForm from './UpdateUserForm'
import UpdateAppointmentForm from './UpdateAppointmentForm'
import './Account.css'
import RegisterPetForm from './RegisterPetForm'
import sessionState from '../../routes/store'
import DisplayApptsDropdown from './DisplayApptsDropdown'

const MyAccountDash = () => {
  const userData = sessionState((state) => state.userData)
  const currentYear = new Date().getFullYear()

  const [selectedSetting, setSelectedSetting] = useState('')

  const dropdownSelect = (text) => {
    setSelectedSetting(text)
  }


  const renderInputSection = () => {
    switch (selectedSetting) {
      case 'Personal Information':
        return <UpdateUserForm/>
      case 'Upcoming Appointments':
        return <UpdateAppointmentForm/>
      case 'Pet Information':
        return <RegisterPetForm/>
      case 'Appointment History':
        return <DisplayApptsDropdown/>
      default:
        return null
    }
  }

  return (
    <div>
      <div className="UpdateAccount">
        <div>
            <h5>Personal Information</h5>
            <ul>
              <li>Your phone number: {userData.phNumber}</li>
              <li>Your email address: {userData.email}</li>
            </ul>
            <p>Use the button below to update the above information and your password.</p>
            <button className="UpdateAccount" onClick={() => dropdownSelect('Personal Information')}>
                Update Personal Information
            </button>
        </div>
        <div>
            <h5>Upcoming Appointments</h5>
            {/* {firstApp ? (
              <p>
                Your next appointment is for a {firstApp.appointmentType}. 
                It is booked for your pet {firstAppPet.petName}, 
                and is booked for {firstAppDate}.
              </p>
            ) : (
              <p>You have no upcoming appointments.</p>
            )} */}
            <button onClick={() => dropdownSelect('Upcoming Appointments')}>
                Update
            </button>
        </div>
        <div>
            <h5>Pet Information</h5>
            {/* {firstPet ? (
              <li>Name: {firstPet.petName}, Animal Type: {firstPet.animalType}, Age: {currentYear - firstPet.birthYear}, Breed: {firstPet.breed}</li>
            ) : (<li>Add Dog Now</li>
            )} 
            {secondPet ? (
              <li>Name: {secondPet.petName}, Animal Type: {secondPet.animalType}, Age: {currentYear - secondPet.birthYear}, Breed: {secondPet.breed}</li>
            ) : (<li>Add Dog Now</li>
            )}
            {thirdPet ? (
              <li>Name: {thirdPet.petName}, Animal Type: {thirdPet.animalType}, Age: {currentYear - thirdPet.birthYear}, Breed: {thirdPet.breed}</li>
            ) : (<li>Add Dog Now</li>
            )}  */}
            <button onClick={() => dropdownSelect('Pet Information')}>
                Register new pet
            </button>
        </div>
        <div>
            <h5>Appointment History</h5>
            <p>- Add info from API</p>
            <button onClick={() => dropdownSelect('Appointment History')}>
                See More..
            </button>
        </div>
      </div>
      <div>{renderInputSection()}</div>
    </div>
  )
}

export default MyAccountDash