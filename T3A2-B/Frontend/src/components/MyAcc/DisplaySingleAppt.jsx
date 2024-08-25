import React from 'react'

const DisplaySingleAppt = ({ appt }) => {
    if (!appt) return <></>
    
    let apptDate = new Date(appt.date).toString()
    let vetName = appt.vetId.vetName
    let petName = appt.petId.petName
    let apptType = appt.appointmentType.charAt(0).toUpperCase() + appt.appointmentType.slice(1)
    return (
    <>
        <p>Appointment Date: {apptDate.slice(0, 21)}</p>
        <p>Vet: {vetName}</p> 
        <p>Patient: {petName}</p> 
        <p>Appointment Type: {apptType}</p>
    </>
    )
}

export default DisplaySingleAppt