import React, { useState } from 'react'
import UpdateUser from './PersonalInfo'
import UpcomingAppointments from './UpcomingApps'
import './Account.css'
import PetInfo from './PetInfo'
import sessionState from '../../routes/store'

const AccountSettings = () => {
  const userData = sessionState((state) => state.userData)

  const firstApp = userData.appointments[0]
  const firstAppPet = firstApp.petId
  const firstAppDate = Date(firstApp.date).toString()

  // const secondApp = userData.appointments[1]
  // const secondAppPet = secondApp.petId
  // const secondAppDate = Date(secondApp.date).toString()

  const firstPet = userData.pets[0]
  const secondPet = userData.pets[1]
  const thirdPet = userData.pets[2] 
  const currentYear = new Date().getFullYear()

  
  const [selectedSetting, setSelectedSetting] = useState('')

  const handleButtonClick = (text) => {
    setSelectedSetting(text)
  }


  const renderInputSection = () => {
    switch (selectedSetting) {
      case 'Personal Information':
        return <UpdateUser />
      case 'Upcoming Appointments':
        return <UpcomingAppointments />
      case 'Pet Information':
        return <PetInfo />
      case 'Appointment History':
        return (
          <div className="UpdateAccountBox">
            <h5>Appointment History</h5>
            <p>Display here all past appointments</p>
          </div>
        )
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
            <button className="UpdateAccount" onClick={() => handleButtonClick('Personal Information')}>
                Update Personal Information
            </button>
        </div>
        <div>
            <h5>Upcoming Appointments</h5>
            {firstApp ? (
              <p>
                Your next appointment is for a {firstApp.appointmentType}. 
                It is booked for your pet {firstAppPet.petName}, 
                and is booked for {firstAppDate}.
              </p>
            ) : (
              <p>You have no upcoming appointments.</p>
            )}
            {/* {secondApp ? (
              <p>
                Your next appointment is for a {secondApp.appointmentType}. 
                It is booked for your pet {secondAppPet.petName}, 
                and is booked for {secondAppDate}.
              </p>
            ) : (
              <p>You have no more upcoming appointments.</p>
            )} */}
            <button onClick={() => handleButtonClick('Upcoming Appointments')}>
                Update
            </button>
        </div>
        <div>
            <h5>Pet Information</h5>
            {firstPet ? (
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
            )} 
            <button onClick={() => handleButtonClick('Pet Information')}>
                Register new pet
            </button>
        </div>
        <div>
            <h5>Appointment History</h5>
            <p>- Add info from API</p>
            <button onClick={() => handleButtonClick('Appointment History')}>
                See More..
            </button>
        </div>
      </div>
      <div>{renderInputSection()}</div>
    </div>
  )
}

export default AccountSettings