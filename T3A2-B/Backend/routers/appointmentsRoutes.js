import { Router } from "express"
import { User } from "../models/usersModel.js"
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import errorFormatter from "./errorHandler.js"
import customErrors from "../errorObjs.js"
// import idValidator from "../models/idValidator.js"

const router = Router()
const appointmentsPrefix = '/appointments'

// Get list of appointments no JWT
router.get(`${appointmentsPrefix}-list`, async (req, res, next) => {
    try {
        let retAppts = await Appointment.find({}, '-__v -userId -petId -appointmentType').populate([
                {
                    path: 'vetId',
                    select: '-appointments -__v'
                }
            ]
        )
        res.send(retAppts)
    }
    catch (err) {
        next(err)
    }
})


// Get list of appointments JWT authorised
router.get(`${appointmentsPrefix}`, async (req, res, next) => {
    let { userId, isAdmin } = req.auth

    // If user is admin, get all vets and their appointments including user details and pets
    try {
    if (isAdmin) {
        res.send(await Appointment.find({}, '-__v').populate([
            {
                path: 'userId',
                select: '_id firstName lastName phNumber'
            },
            {
                path: 'vetId',
                select: '-appointments -__v'
            },
            {
                path: 'petId',
                select: '-appointments -__v -userId'
            }
        ]))
    }
    else {
        res.send(await Appointment.find({userId: userId}, '-__v').populate([
            {
                path: 'userId',
                select: '_id firstName lastName phNumber'
            },
            {
                path: 'vetId',
                select: '-appointments -__v'
            },
            {
                path: 'petId',
                select: '-appointments -__v -userId'
            }
        ]))
    }}
    catch (err) {
        next(err)
    }
})

// Get single appointment
router.get(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth

        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        // Retrieve appt
        const appointment = await Appointment.findById(
            req.params.id
        ).populate([
            {
                path: 'userId',
                select: '_id firstName lastName phNumber'
            },
            {
                path: 'vetId',
                select: '-appointments -__v'
            },
            {
                path: 'petId',
                select: '-appointments -__v -userId'
            }
        ])

        if (appointment) {
            // Check if user is authed then send
            if (isAdmin || appointment.userId._id == userId) {
                res.send(appointment)
            }
            else {
                throw customErrors.authError
            }
        } 
        else {
            throw customErrors.noAppt
        }
    }
    catch (err) {
        next(err)
    } 
})

// Create an appointment
router.post(`${appointmentsPrefix}`, async (req, res, next) => {
    try {
        let { userId , isAdmin } = req.auth
        // Check if user is admin, otherwise sets UserId to JWT value
        if (!isAdmin) {
            req.body.userId = userId
        }

        // Check if appt exists in DB
        let apptCheck = await Appointment.findOne({'date': req.body.date, 'vetId': req.body.vetId})
        if (apptCheck) {
            throw customErrors.apptExists
        }
        
        // Create a new appointment object and add it to the DB
        const newAppointment = await Appointment.create(req.body)

        // Retrieve Pet whose appointment it is
        let retPet = await Pet.findOne({_id: req.body.petId})

        // Check if registered Pet belongs to user
        if (!isAdmin && retPet.userId != userId) {
            throw customErrors.authError
        }

        // Add new appointment to retrieved Pet
        retPet.appointments.push(newAppointment._id)

        // Update Pet with new appointment
        let savePet = await Pet.findOneAndUpdate({_id: req.body.petId}, {appointments: retPet.appointments}, {returnDocument: 'after'})

        // Retrieve Vet whose appointment it is
        let retVet = await Vet.findOne({_id: req.body.vetId})

        // Add new appointment to retrieved Pet
        retVet.appointments.push(newAppointment._id)

        // Update Vet with new appointment
        let saveVet = await Vet.findOneAndUpdate({_id: req.body.vetId}, {appointments: retVet.appointments}, {returnDocument: 'after'})

        // Retrieve User who registered pet
        let retUser = await User.findOne({_id: req.body.userId})

        // Add new pet to retrieved user
        retUser.appointments.push(newAppointment._id)

        // Update user with new values
        let saveUser = await User.findOneAndUpdate({_id: userId}, {appointments: retUser.appointments}, {returnDocument: 'after'})

        // Respond to the client with the registered Appointment instance
        res.status(201).send(newAppointment)
    }
    catch (err) {
        next(err)
    }
})

// Update an appointment
router.patch(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId , isAdmin } = req.auth

        // Check if appointment is registered to user
        let authCheck = await Appointment.findById(req.params.id)
        if (authCheck) {
            if (!isAdmin && authCheck.userId != req.auth.userId) {
                throw customErrors.authError
            }
            if (req.body.petId && authCheck.petId !== req.body.petId) {
                throw customErrors.changeApptPet
            }
        }
        else {
            throw customErrors.noAppt
        }

        let retPet
        // Retrieve Pet whose appointment it is if petId is included in update values
        if (req.body.petId) {
        retPet = await Pet.findOne({_id: req.body.petId})
        // Check if registered Pet belongs to user
        if (!isAdmin && retPet.userId != userId) {
            throw customErrors.authError
        }}

        // Check if appt exists in DB
        let apptCheck = await Appointment.findOne({'date': req.body.date,  'vetId': req.body.vetId})
        if (apptCheck) {
            throw customErrors.apptExists
        }

        // If not admin, sets update's userId value to equal the JWT userId
        if (!isAdmin) {
            req.body.userId = userId
        }

        const updAppointment = await Appointment.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )

        // If userId, or petId is not included in update request, take those values from the updated appointment to update them in individual instance
        if (!req.body.userId) {
            req.body.userId = updAppointment.userId.toString()
        }

        if (!req.body.petId) {
            req.body.petId = updAppointment.petId.toString()
        }

        // If vetId is passed in the body, it could mean the booking's vet is changing, need to get the vetId of old vet and remove appointment from it
        if (req.body.vetId) {
            // Finds all vets with the updated appointment's Id in their appointments
            let allVetsWAppt = await Vet.find({appointments: {_id: req.params.id}})
            // Filters for vets who don't have the submitted vetId
            let notVet = allVetsWAppt.find((vet) => {return vet._id !== req.body.vetId})
            // Delete appointment in vet
            if (notVet) {
                for (let apptIndex in notVet.appointments) {
                    if (notVet.appointments[apptIndex].toString() == req.params.id) {
                    // Delete matched appointment value
                    notVet.appointments.splice(apptIndex, 1)
                    }
                }
                // Update old Vet without appointment
                let saveNotVet = await Vet.findOneAndUpdate({_id: notVet._id}, {appointments: notVet.appointments}, {returnDocument: 'after'})
            }
        }

        // Retrieved pet might be defined from before, retrieves it if not
        if (!retPet) {
            retPet = await Pet.findOne({_id: req.body.petId})
        }

        // Update appointment in pet
        for (let singleAppt of retPet.appointments) {
            if (singleAppt._id == updAppointment._id) {
                // Assign new appointment value to matched appointment in pet
                singleAppt = updAppointment
            }
        }

        // Update Pet with new appointment
        let savePet = await Pet.findOneAndUpdate({_id: req.body.petId}, {appointments: retPet.appointments}, {returnDocument: 'after'})

        // If vetId is not passed in body, retrieves the vet who receives the updated booking based on submitted updated appointment
        if (!req.body.vetId) {
            req.body.vetId = updAppointment.vetId.toString()
        }

        // Retrieve Vet whose ID is saved to the appointment
        let retVet = await Vet.findOne({_id: req.body.vetId})

        // Check to see if appt is already saved with vet, if so updates
        let updApt = false
        // Update appointment in new Vet
        for (let i in retVet.appointments) {
            if (retVet.appointments[i]._id == updAppointment._id) {
                retVet.appointments[i] = updAppointment
                updApt = true
            }
        }
        // If not, adds it to their appointments
        if (!updApt) {
            retVet.appointments.push(updAppointment)
        }

        // Update Vet with new appointment
        let saveVet = await Vet.findOneAndUpdate({_id: req.body.vetId}, {appointments: retVet.appointments}, {returnDocument: 'after'})

        // Retrieve User who registered pet
        let retUser = await User.findOne({_id: req.body.userId})

        // Update appointment in user
        for (let singleAppt of retUser.appointments) {
            if (singleAppt._id == updAppointment._id) {
                // Assign new appointment value to matched appointment in user
                singleAppt = updAppointment
            }
        }

        // Update user with new values
        let saveUser = await User.findOneAndUpdate({_id: req.body.userId}, {appointments: retUser.appointments}, {returnDocument: 'after'})

        if (updAppointment) {
            res.status(200).send(updAppointment)
        } else {
            throw customErrors.noAppt
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a Appointment
router.delete(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId , isAdmin } = req.auth

        // Check if appointment is registered to user
        let authCheck = await Appointment.findById(req.params.id)
        if (authCheck) {
            if (!isAdmin && authCheck.userId != req.auth.userId) {
                throw customErrors.authError
            }
        }
        else {
            throw customErrors.noAppt
        }

        const delAppointment = await Appointment.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )

        // Retrieve Pet whose appointment it is
        let retPet = await Pet.findOne({_id: authCheck.petId})

        // Delete appointment in pet
        for (let apptIndex in retPet.appointments) {
            if (retPet.appointments[apptIndex].toString() == req.params.id) {
                // Delete matched appointment value
                retPet.appointments.splice(apptIndex, 1)
            }
        }

        // Update Pet with new appointment
        let savePet = await Pet.findOneAndUpdate({_id: authCheck.petId}, {appointments: retPet.appointments}, {returnDocument: 'after'})

        // Retrieve Vet whose appointment it is
        let retVet = await Vet.findOne({_id: authCheck.vetId})
        
        // Delete appointment in vet
        for (let apptIndex in retVet.appointments) {
            if (retVet.appointments[apptIndex].toString() == req.params.id) {
                // Delete matched appointment value
                retVet.appointments.splice(apptIndex, 1)
            }
        }


        // Update Vet with new appointment
         let saveVet = await Vet.findOneAndUpdate({_id: req.body.vetId}, {appointments: retVet.appointments}, {returnDocument: 'after'})

        // Retrieve User who registered pet
        let retUser = await User.findOne({_id: authCheck.userId})

        // Delete appointment in pet
        for (let apptIndex in retUser.appointments) {
            if (retUser.appointments[apptIndex].toString() == req.params.id) {
                // Delete matched appointment value
                retUser.appointments.splice(apptIndex, 1)
            }
        }

        // Update user with new values
        let saveUser = await User.findOneAndUpdate({_id: authCheck.userId}, {appointments: retUser.appointments}, {returnDocument: 'after'})

        if (delAppointment) {
            res.status(200).send({Success: "Appointment deleted"})
        } else {
            throw customErrors.noAppt
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router