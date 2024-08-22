import React, { useEffect, useState } from 'react'
import AccountSettings from '../components/MyAcc/Account'

const MyAcc = () => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM2ZWZlNTMxYWYyOGEzZDgzYjYwZDAiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzI0MzE0NzA4LCJleHAiOjE3MjQzMTgzMDh9.9gB_V_JpGHm8T9fuTRBh-Geb8XuOmckseP_IE4BHFG0" 
        if (!accessToken) {
          throw new Error('No access token found')
        }

        const response = await fetch('https://t3a2-mern-app.onrender.com/users/66c6efe531af28a3d83b60d0', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, 
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user information')
        }

        const data = await response.json()
        setUserInfo(data)
      } catch (error) {
        console.error('Error: Failed to fetch user information', error)
      }
    }

    fetchUserInfo()
  }, [])

  if (!userInfo) {
    return  <div className="contentFrame">
              <h3>Loading request...</h3>
            </div>
  }

  return (
    <>
      <div className="contentFrame">
        <h4>Welcome {userInfo.firstName} {userInfo.lastName}</h4>
        <p>Manage your appointments, personal information, pet information, and your history with us.</p>
        <AccountSettings userInfo={userInfo}/>
      </div>
    </>
  )
}

export default MyAcc
