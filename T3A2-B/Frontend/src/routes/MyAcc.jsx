import React from 'react'
import AccountSettings from '../components/MyAcc/Account'

const MyAcc = () => {
  return (
    <>
        <div className="contentFrame">
          <h4>Welcome 'Name'</h4>
          <p>Manage your appointments, personal information, pet information and, your history with us.</p>
          <AccountSettings />
        </div>
    </>
  )
}

export default MyAcc