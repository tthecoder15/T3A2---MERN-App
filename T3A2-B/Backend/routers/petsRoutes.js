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
    let { userId, isAdmin } = req.auth
    try {
        if ( isAdmin == true ) {
            res.send(await Pet.find({}, '-__v').populate({
                path: 'appointments',
                select: '-__v -petId',
                populate: [
                    {
                        path: 'userId',
                        select: 'firstName lastName -_id'
                    },
                    {
                        path: 'vetId',
                        select: 'vetName'
                    }
                    ]
            }))
        }
        else {
            res.send(await Pet.find({userId: userId}, '-__v').populate({
                path: 'appointments',
                select: '-__v -petId',
                populate: [
                    {
                        path: 'userId',
                        select: 'firstName lastName -_id'
                    },
                    {
                        path: 'vetId',
                        select: 'vetName'
                    }
                    ]
            }))
        }
    }
    catch (err) {
        next(err)
    }
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

        // Check if pet with same name exists in DB registered to that user
        let petCheck = await Pet.findOne({userId: req.body.userId, petName: req.body.petName})
        if (petCheck) {
            throw customErrors.petExists
        }

        // Create a new pet object and add it to the DB
        const newPet = await Pet.create(req.body)

        // Retrieve User who registered pet
        let retUser = await User.findOne({_id: userId})

        // Add new pet to retrieved user
        retUser.pets.push(newPet._id)

        // Update user with new values
        let saveUser = await User.findOneAndUpdate({_id: userId}, {pets: retUser.pets}, {returnDocument: 'after'})

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
        
        // Check if pet with same name exists in DB registered to that user
        let petCheck = await Pet.findOne({userId: req.body.userId, petName: req.body.petName})
        if (petCheck) {
            throw customErrors.petExists
        }

        // If not admin, sets update's userId value to equal the JWT userId
        if (!isAdmin) {
            req.body.userId = userId
        }

        // Submit changes to DB
        const pet = await Pet.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )

        // Add updated pet to user
        let retUser = await User.findOne({_id: userId})
        
        for (let singlePet of retUser.pets) {
            if (singlePet._id == pet._id) {
                // Assign new pet value to matched pet
                singlePet = pet
            }
        }

        // Save updated User to db
        let saveUser = await User.findOneAndUpdate({_id: userId}, retUser, {new: true})


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

        // Retrieve user to delete pet
        let retUser = await User.findOne({_id: userId})
        
        for (let petIndex in retUser.pets) {
            if (retUser.pets[petIndex].toString() == req.params.id) {
                // Assign new pet value to matched pet
                retUser.pets.splice(petIndex, 1)
            }
        }

        // Save updated User to db
        let saveUser = await User.findOneAndUpdate({_id: userId}, retUser, {new: true})

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