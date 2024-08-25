import sessionState from '../../routes/store'
import { useEffect, useState } from 'react'

const DisplayApptsDropdown = () => {
    const userData = sessionState((state) => state.userData)

    const [upcomingAppts, setUpcomingAppts] = useState([])
    const [pastAppts, setPastAppts] = useState([])

    const apptSort = () => {
        try{
            let upcDates = []
            let oldDates = []
            if ('appointments' != '{}') {
                for (let appt of userData.appointments) {
                    let dateNow = Date.now()
                    let apptDate = new Date(appt.date)
                    if (apptDate > dateNow) {
                        upcDates.push(appt)
                    }
                    else {
                        oldDates.push(appt)
                    }
                }
            
            setUpcomingAppts(upcDates)
            setPastAppts(oldDates)
        }
        }
        catch (err) {
            console.log(err)
        }
    }

    
    useEffect(() => {
        apptSort()
    }, userData)

    const genApptsHtml = (appts) => {
        return (
            appts.map((appt) => {
                let apptDate = new Date(appt.date).toString()
                let vetName = appt.vetId.vetName
                let petName = appt.petId.petName
                let apptType = appt.appointmentType.charAt(0).toUpperCase() + appt.appointmentType.slice(1)
                return (
                    <div className='appointment' key='apptDate'>
                        <h6>Appointment Date: {apptDate.slice(0, 21)}</h6>
                        <p>Vet: {vetName}</p> 
                        <p>Patient: {petName}</p> 
                        <p>Appointment Type: {apptType}</p>
                    </div>
                )
            }))
    }

    return (
            <div className="UpdateAccountBox">
            <h4>Appointment History</h4>
            <h5>Upcoming Appointments:</h5>
            <>{genApptsHtml(upcomingAppts)}</>
            <h5>Past Appointments:</h5>
            <>{genApptsHtml(pastAppts)}</>
            </div>
    )
}

export default DisplayApptsDropdown