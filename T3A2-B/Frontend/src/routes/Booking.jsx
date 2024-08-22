import React from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from '../components/Booking/DropDownMenu'

const Booking = () => {
  return (
    <>
        <div className="contentFrame">
          <h2>Book Now</h2>
          <div>
            <div>
              <Link to="/user/login">Please sign in or register</Link>
              <p>--If User is signed in display their name inside--</p>
            </div>
            <p><DropDownMenu /></p>
          </div>
        </div>
    </>
  )
}

export default Booking