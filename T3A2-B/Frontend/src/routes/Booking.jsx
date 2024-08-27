import React from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from '../components/Booking/MakeBookingForm'

const Booking = () => {
  
  return (
    <>
        <div className="contentFrame">
          <h2>Book Your Appointment</h2>
          <div>
            <div>
              <Link to="/user/login">Please sign in or register</Link>
              <p>--If User is signed in display their name inside--</p>
            </div>
            <DropDownMenu />
          </div>
        </div>
    </>
  )
}

export default Booking