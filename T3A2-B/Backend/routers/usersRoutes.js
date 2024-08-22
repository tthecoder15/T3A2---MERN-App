import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import jwt from 'jsonwebtoken'
import { dotenv } from "../db.js"
import bcrypt from 'bcrypt'

const router = Router()
const usersPrefix = '/users'
const saltRounds = 10

// Login
// Generate JWT
router.post(`${usersPrefix}/login`, async (req, res, next) => {
    // req.body
    let { email, password } = req.body
    try {
        let user = await User.findOne({'email': email})
        const hashedCheck = await bcrypt.compare(password, user.password)
        console.log('Hashed check: ', hashedCheck)
        if (user && hashedCheck) {
            let token = jwt.sign({
                userId: user._id,
                email: user.email
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})
            res.status(200).send({JWT: token})
        }
        else {
            throw {"error/s": ["login-error"], "login-error": "Incorrect email or password provided. Please try again"}
        }
    }
    catch (err) {
        next(err)
    }
})

// Get list of users
router.get(`${usersPrefix}`, async (req, res, next) => {
    
    res.send(await User.find({}, ('-password -__v')).populate('pets', '-appointments -__v -userId').populate('appointments', '-userId -vetId -petId -__v'))
})

// Get single user
router.get(`${usersPrefix}/:id`, async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id
        ).populate('pets', '-appointments -__v -userId -password').populate({
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
        next(err)
    } 
})

// Create a user
router.post(`${usersPrefix}`, async (req, res, next) => {
    try {
        // Validate the input - validation in schema 
        // Create a new user object and add it to the DB
        const newUser = await User.create(req.body)
        // Respond to the client with the registered User instance
        res.status(201).send(newUser)}
    catch (err) {
        next(err)
    }
})

// Update an book
router.patch(`${usersPrefix}/:id`, async (req, res, next) => {
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
        next(err)
    }    
})

// Delete a User
router.delete(`${usersPrefix}/:id`, async (req, res, next) => {
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
        next(err)
    }    
})

export default router