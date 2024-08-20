import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'

const router = Router()
const usersPrefix = '/users'

// Get list of users
router.get(`${usersPrefix}`, async (req, res) => {
    res.send(await User.find({}, ('-password -__v')).populate('pets', '-appointments -__v -userId').populate('appointments', '-userId -vetId -petId -__v'))
})

// Get single user
router.get(`${usersPrefix}/:id`, async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        ).populate('pets', '-appointments -__v -userId').populate({
            path: 'appointments', 
            select: '-userId -__v', 
            populate: [
                {
                    path: 'petId', 
                    select: '-userId -__v -appointments -userId'
                },
                {
                    path: 'vetId',
                    select: 'vetName -_id'
                }
            ]
        })
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({error: "User not found"})
        }
    }
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    } 
})

// Create a user
router.post(`${usersPrefix}`, async (req, res) => {
    try {
        // Validate the input - validation in schema 
        // Create a new user object and add it to the DB
        const newUser = await User.create(req.body)
        // Respond to the client with the registered User instance
        res.status(201).send(newUser)}
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})

// Update an book
router.patch(`${usersPrefix}/:id`, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({error: "User not found"})
        }
    }
    catch (err) {
        res.status(400).send({Error: err.message})
    }    
})

// Delete a User
router.delete(`${usersPrefix}/:id`, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (user) {
            res.status(200).send({Success: "User deleted"})
        } else {
            res.status(404).send({error: "User not found"})
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }    
})

export default router