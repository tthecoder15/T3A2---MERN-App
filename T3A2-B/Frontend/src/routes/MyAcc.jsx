import React, { useEffect, useState } from 'react'
import AccountSettings from '../components/MyAcc/Account'
import sessionState from './store'

const MyAcc = () => {
  const userData = sessionState((state) => state.userData)
  const token = sessionState((state) => state.token)

  if (!userData) {
    return  <div className="contentFrame">
              <h3>Loading request...</h3>
            </div>
  }

  return (
    <>
      <div className="contentFrame">
        <h4>Welcome {userData.firstName} {userData.lastName}</h4>
        <p>Manage your appointments, personal information, pet information, and your history with us.</p>
        <AccountSettings userInfo={userData}/>
      </div>
    </>
  )
}

export default MyAcc
