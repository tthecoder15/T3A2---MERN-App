import React, { useState } from 'react'

const AccountSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setErrorMessage('')
  }

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value)
    setErrorMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
        setErrorMessage('New email address does not match.')
    }
    if (password !== confirmPassword) {
        setErrorMessage('New password does not match.')
    }
  }

  const handleButtonClick = (text) => {
    setSelectedSetting(text)
  }

  const renderInputSection = () => {
    switch (selectedSetting) {
      case 'Personal Information':
        return (
          <div>
            <h5>Personal Information</h5>
            <input 
                type="text" 
                placeholder="Contact Number" 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={handleEmailChange}
            />
            <input 
                type="email" 
                placeholder="Confirm Email" 
                value={confirmEmail} 
                onchange={handleConfirmEmailChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target,value)}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button 
                type="submit"
            >Update Information</button>
          </div>
        )
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
                Update
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
      <div>{selectedSetting && renderInputSection()}</div>
    </div>
  )
}

export default AccountSettings