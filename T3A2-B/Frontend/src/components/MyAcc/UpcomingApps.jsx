import React from 'react'
import { Link } from 'react-router-dom'

const handleDelete = () => {
  // Delete fetched data from DB
}

const UpcomingAppointments = () => {
  return (
    <div className="UpdateAccountBox">
      <h5>Upcoming Appointments</h5>
      <p>---CONNECT TO DB---</p>
      <p>Once connected, display each booked appointment next appointment first</p>
      <p>You do not have any current appointments.</p>
      <Link to="/booking">Book now</Link>
      <button onClick={() => handleDelete('Upcoming Appointments')}>
                Cancel Booking
            </button>
    </div>
  )
}

export default UpcomingAppointments