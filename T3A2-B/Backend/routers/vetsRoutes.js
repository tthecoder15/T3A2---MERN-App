import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'

const router = Router()
const vetsPrefix = '/vets'

// Get list of vets
router.get(`${vetsPrefix}`, async (req, res) => {
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
router.get(`${vetsPrefix}/:id`, async (req, res) => {
    try {
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
            res.status(404).send({error: "Vet not found"})
        }
    }
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    } 
})

// Create a vet
router.post(`${vetsPrefix}`, async (req, res) => {
    try {
        // Validate the input - validation in schema 
        // Create a new vet object and add it to the DB
        const newVet = await Vet.create(req.body)
        // Respond to the client with the registered Vet instance
        res.status(201).send(newVet)}
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})

// Update an book
router.patch(`${vetsPrefix}/:id`, async (req, res) => {
    try {
        const vet = await Vet.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (vet) {
            res.status(200).send(vet)
        } else {
            res.status(404).send({error: "Vet not found"})
        }
    }
    catch (err) {
        res.status(400).send({Error: err.message})
    }    
})

// Delete a Vet
router.delete(`${vetsPrefix}/:id`, async (req, res) => {
    try {
        const vet = await Vet.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (vet) {
            res.status(200).send({Success: "Vet deleted"})
        } else {
            res.status(404).send({error: "Vet not found"})
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }    
})

export default router