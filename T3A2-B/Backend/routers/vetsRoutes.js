import { Router } from "express"
import { User } from "../models/usersModel.js"
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import customErrors from "../errorObjs.js"

const router = Router()
const vetsPrefix = '/vets'

// Get list of vets
router.get(`${vetsPrefix}`, async (req, res, next) => {
    let { userId, isAdmin } = req.auth
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
    }))
})

// Get single vet
router.get(`${vetsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        const vet = await Vet.findById(
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
        })
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