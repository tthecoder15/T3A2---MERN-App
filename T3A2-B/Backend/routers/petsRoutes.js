import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import errorFormatter from "./errorHandler.js"

const router = Router()
const petsPrefix = '/pets'

// Get list of pets
router.get(`${petsPrefix}`, async (req, res, next) => {
    res.send(await Pet.find({}, '-__v').populate({
        path: 'appointments',
        select: '-__v -petId',
        populate: [
            {
                path: 'userId',
                select: 'firstName lastName'
            },
            {
                path: 'petId',
                select: '-appointments -__v'
            }
        ]
    }))
})

// Get single pet
router.get(`${petsPrefix}/:id`, async (req, res, next) => {
    try {
        const pet = await Pet.findById(
            req.params.id
        ).populate({
            path: 'appointments',
            select: '-__v -petId',
            populate: [
                {
                    path: 'userId',
                    select: 'firstName lastName'
                },
                {
                    path: 'petId',
                    select: '-appointments -__v'
                }
            ]
        })
        if (pet) {
            res.send(pet)
        } else {
            res.status(404).send({error: "Pet not found"})
        }
    }
    catch (err) {
        next(err)
    } 
})

// Create a pet
router.post(`${petsPrefix}`, async (req, res, next) => {
    try {
        // Validate the input - validation in schema 
        // Create a new pet object and add it to the DB
        const newPet = await Pet.create(req.body)
        // Respond to the client with the registered Pet instance
        res.status(201).send(newPet)}
    catch (err) {
        next(err)
    }
})

// Update a Pet
router.patch(`${petsPrefix}/:id`, async (req, res, next) => {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (pet) {
            res.status(200).send(pet)
        } else {
            res.status(404).send({error: "Pet not found"})
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a Pet
router.delete(`${petsPrefix}/:id`, async (req, res, next) => {
    try {
        const pet = await Pet.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (pet) {
            res.status(200).send({Success: "Pet deleted"})
        } else {
            res.status(404).send({error: "Pet not found"})
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router