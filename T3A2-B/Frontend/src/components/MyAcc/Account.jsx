import React, { useState } from 'react'
import UpdateUser from './PersonalInfo'
import UpcomingAppointments from './UpcomingApps'
import './Account.css'
import PetInfo from './PetInfo'
import sessionState from '../../routes/store'

const AccountSettings = () => {
  const userData = sessionState((state) => state.userData)
  
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
            <p>- Add info from API</p>
            <button onClick={() => handleButtonClick('Upcoming Appointments')}>
                Update
            </button>
        </div>
        <div>
            <h5>Pet Information</h5>
            <p>- Add info from API</p>    
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