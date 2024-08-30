import { Router } from "express"
import { User } from "../models/usersModel.js"
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import customErrors from "../errorObjs.js"

const router = Router()
const vetsPrefix = '/vets'

// Get list of vets no JWT
router.get(`${vetsPrefix}-list`, async (req, res, next) => {
    // Return only vet names and IDs
    try {
        let retVets = await Vet.find({}, '-__v').populate('appointments', '-__v -vetId -userId -petId -appointmentType')
        res.send(retVets)
    }
    catch (err) {
        next(err)
    }

})

// Get list of vets
router.get(`${vetsPrefix}`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth

        // If user is admin, get all vets and their appointments including user details and pets
        if (isAdmin) {
        res.send(await Vet.find({}, '-__v').populate({
            path: 'appointments',
            select: '-vetId -__v',
            populate: [
                {
                    path: 'userId',
                    select: 'firstName lastName'
                },
                {
                    path: 'petId',
                    select: 'name'
                },
            ]
        }))}

        // If user is not admin, return only vet name and ID
        else {
            res.send(await Vet.find({}, '-__v').populate('appointments', '-__v -vetId -userId -petId -appointmentType'))
        }
    }
    catch (err) {
        next(err)
    }

})

// Get single vet
router.get(`${vetsPrefix}/:id`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth
        
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }
        
        let vet = null
        // If user is admin send populated vet info and appointments
        if (isAdmin) {
            vet = await Vet.findById(
            req.params.id
            ).populate({
            path: 'appointments',
            select: '-vetId -__v',
            populate: [
                {
                    path: 'userId',
                    select: 'firstName lastName'
                },
                {
                    path: 'petId',
                    select: 'name'
                },
            ]
        })}
        else {
            vet = await Vet.findById(req.params.id).populate('appointments', '-vetId -__v -userId -petId').select('-__v')
        }

        if (vet) {
            res.send(vet)
        } else {
            throw customErrors.noVet
        }
    }
    catch (err) {
        next(err)
    } 
})

// Create a vet
router.post(`${vetsPrefix}`, async (req, res, next) => { 
    try {
        
        // Validate the input - validation in schema 
        let { isAdmin } = req.auth
        // Check if user is admin
        if (!isAdmin) {
            throw customErrors.authError
        }

        // Check if vet exists in DB
        let vetCheck = await Vet.findOne({'vetName': req.body.vetName})
        if (vetCheck) {
            throw customErrors.vetExists
        }
        // Create a new vet object and add it to the DB
        const newVet = await Vet.create(req.body)
        // Respond to the client with the registered Vet instance
        res.status(201).send(newVet)
    }
    catch (err) {
        next(err)
    }
})

// Update an book
router.patch(`${vetsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { isAdmin } = req.auth
        // Check if user is admin
        if (!isAdmin) {
            throw customErrors.authError
        }

        // Check if vet with same name exists in DB
        let vetCheck = await Vet.findOne({'vetName': req.body.vetName})
        if (vetCheck) {
            throw customErrors.vetExists
        }

        const vet = await Vet.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (vet) {
            res.status(200).send(vet)
        } else {
            throw customErrors.noVet
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a Vet
router.delete(`${vetsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { isAdmin } = req.auth
        // Check if user is admin
        if (!isAdmin) {
            throw customErrors.authError
        }

        const vet = await Vet.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (vet) {
            res.status(200).send({Success: "Vet deleted"})
        } else {
            throw customErrors.noVet
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router