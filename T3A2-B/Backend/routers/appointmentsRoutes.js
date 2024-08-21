import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import errorFormatter from "./errorHandler.js"
// import idValidator from "../models/idValidator.js"

const router = Router()
const appointmentsPrefix = '/appointments'

// Get list of appointments
router.get(`${appointmentsPrefix}`, async (req, res, next) => {
    let retAppts = await Appointment.find({}, '-__v').populate([
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
        ]
    )
    let editedAppts = retAppts.map((appt) => {
        return {...appt._doc, date: new Date(appt.date).toString()}
    })
    res.send(editedAppts)
})

// Get single appointment
router.get(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
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
            // let editedAppt = {...appointment._doc, date: new Date(appointment.date).toString()}
            res.send(appointment)
        } 
        else {
            res.status(404).send({error: "Appointment not found"})
        }
    }
    catch (err) {
        next(err)
    } 
})

// Create an appointment
router.post(`${appointmentsPrefix}`, async (req, res, next) => {
    try {
        // Create a new appointment object and add it to the DB
        const newAppointment = await Appointment.create(req.body)

        // Respond to the client with the registered Appointment instance
        res.status(201).send(newAppointment)}
    catch (err) {
        next(err)
    }
})

// Update an book
router.patch(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (appointment) {
            res.status(200).send(appointment)
        } else {
            res.status(404).send({error: "Appointment not found"})
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a Appointment
router.delete(`${appointmentsPrefix}/:id`, async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (appointment) {
            res.status(200).send({Success: "Appointment deleted"})
        } else {
            res.status(404).send({error: "Appointment not found"})
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router