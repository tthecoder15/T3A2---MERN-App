import React from 'react'
import DeleteApptPopup from './DeleteApptPopup'

const DisplaySingleAppt = ({ appt, updateB, deleteB }) => {
    if (!appt) return <></>
    
    let apptDate = new Date(appt.date).toString()
    let vetName = appt.vetId.vetName
    let petName = appt.petId.petName
    let apptType = appt.appointmentType.charAt(0).toUpperCase() + appt.appointmentType.slice(1)
    

    return (
    <div className='appointment-box'>
        <p>Appointment Date: {apptDate.slice(0, 21)}</p>
        <p>Vet: {vetName}</p> 
        <p>Patient: {petName}</p> 
        <p>Appointment Type: {apptType}</p>

        {/* {updateB ? <button>Update</button> : <></>} */}
        {deleteB ? <DeleteApptPopup trigger={<button>Delete</button>} appt={appt}/> : <></>}

    </div>
    )
}

export default DisplaySingleAppt