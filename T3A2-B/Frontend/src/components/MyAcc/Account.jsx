import React, { useState } from 'react'
import PersonalInformation from './PersonalInfo'

const AccountSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState('')


  const handleButtonClick = (text) => {
    setSelectedSetting(text)
  }

  const renderInputSection = () => {
    switch (selectedSetting) {
      case 'Personal Information':
        return <PersonalInformation />
      case 'Upcoming Appointments':
        return (
          <div>
            <h5>Upcoming Appointments</h5>
            <input type="date" placeholder="Select appointment date" />
            <input type="text" placeholder="Enter appointment details" />
          </div>
        )
      case 'Pet Information':
        return (
          <div>
            <h5>Pet Information</h5>
            <input type="text" placeholder="Enter pet name" />
            <input type="text" placeholder="Enter pet species" />
          </div>
        )
      case 'Appointment History':
        return (
          <div>
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
      <div>
        <div>
            <h5>Personal Information</h5>
            <p>- Add info from API</p>
            <button onClick={() => handleButtonClick('Personal Information')}>
                Update Personal Information
            </button>
        </div>
        <div>
            <h5>Upcoming Appointments</h5>
            <p>- Add info from API</p>
            <button onClick={() => handleButtonClick('Upcoming Appointments')}>
                Update
            </button>
            <p>Add a delete button</p>
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