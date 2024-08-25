import { Router } from "express"
import { User } from "../models/usersModel.js"
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import errorFormatter from "./errorHandler.js"
import customErrors from "../errorObjs.js"

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
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId , isAdmin } = req.auth
        
        // Retrieve pet
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
            if (isAdmin || pet.userId._id == userId ){
                res.send(pet)
            }
            else {
                throw customErrors.authError
            }
        } else {
            throw customErrors.noPet
        }
    }
    catch (err) {
        next(err)
    } 
})

// Create a pet
router.post(`${petsPrefix}`, async (req, res, next) => {
    try {
        let { userId , isAdmin } = req.auth
        // Check if user is admin, otherwise sets UserId to JWT value
        if (!isAdmin) {
            req.body.userId = userId
        }

        // Check if pet exists in DB
        let petCheck = await Vet.findOne({'petName': req.body.petName})
        if (petCheck) {
            throw customErrors.petExists
        }

        // Create a new pet object and add it to the DB
        const newPet = await Pet.create(req.body)
        // Respond to the client with the registered Pet instance
        res.status(201).send(newPet)
    }
    catch (err) {
        next(err)
    }
})

// Update a Pet
router.patch(`${petsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId , isAdmin } = req.auth

        // Check if pet is registered to user
        let authCheck = await Pet.findById(req.params.id)
        if (authCheck) {
            if (!isAdmin && authCheck.userId != req.auth.userId) {
                throw customErrors.authError
            }
        }
        else {
            throw customErrors.noPet
        }
        
        // Searches for user's pets with the same name and throws pet-exists error if pet already exists
        let sameName = Pet.find({petName: req.body.petName, userId: req.body.userId})
        if (sameName) {
            throw customErrors.petExists
        } 

        // If not admin, sets update's userId value to equal the JWT userId
        if (!isAdmin) {
            req.body.userId = userId
        }

        const pet = await Pet.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (pet) {
            res.status(200).send(pet)
        } else {
            throw customErrors.noPet
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a Pet
router.delete(`${petsPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId , isAdmin } = req.auth
                
        // Check if pet is registered to user
        let authCheck = await Pet.findById(req.params.id)
        if (authCheck) {
            if (!isAdmin && authCheck.userId != req.auth.userId) {
                throw customErrors.authError
            }
        }
        else {
            throw customErrors.noPet
        }

        const pet = await Pet.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (pet) {
            res.status(200).send({Success: "Pet deleted"})
        } else {
            throw customErrors.noPet
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router