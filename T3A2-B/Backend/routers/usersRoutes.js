import { Router } from "express"
import { User } from "../models/usersModel.js"
// Importing objects for other models is neccessary even though they are not used
import { Pet } from "../models/petsModel.js"
import { Appointment } from "../models/appointmentsModel.js"
import { Vet } from '../models/vetsModel.js'
import jwt from 'jsonwebtoken'
import { dotenv } from "../db.js"
import bcrypt from 'bcrypt'
import customErrors from "../errorObjs.js"

const router = Router()
const usersPrefix = '/users'
let saltRounds = 10

// Login
// Generate JWT
router.post(`${usersPrefix}/login`, async (req, res, next) => {
    let { email, password } = req.body
    try {
        let user = await User.findOne({'email': email})
        let hashedCheck
        if (user) {
            hashedCheck = await bcrypt.compare(password, user.password)
        }
        else {
            throw customErrors.noUser
        }

        if (hashedCheck) {
            let token = jwt.sign({
                userId: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})
            res.status(200).send({JWT: token})
        }
        else {
            throw customErrors.loginError
        }
    }
    catch (err) {
        next(err)
    }
})

// Get list of users
router.get(`${usersPrefix}`, async (req, res, next) => {
    let { userId, isAdmin } = req.auth
    try {
        if ( isAdmin == true ) {
            res.send(await User.find({}, ('-password -__v')).populate('pets', '-appointments -__v -userId').populate('appointments', '-userId -vetId -petId -__v'))
        }
        else {
            res.send(await User.findById(userId, ('-password -__v')).populate('pets', '-appointments -__v -userId').populate('appointments', '-userId -vetId -petId -__v'))
        }
    }
    catch (err) {
        next(err)
    }
})

// Get single user
router.get(`${usersPrefix}/:id`, async (req, res, next) => {
    try {
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        let { userId, isAdmin } = req.auth
        if (userId == req.params.id || isAdmin == true) {
            const user = await User.findById(req.params.id, '-__v -password')
                .populate('pets', '-appointments -__v -userId -password').populate({
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
                throw customErrors.noUser
            }
        }
        else {
            throw customErrors.authError
        }
        
    }
    catch (err) {
        next(err)
    } 
})

// Create a user
router.post(`${usersPrefix}`, async (req, res, next) => {
    try {
        // Check if user exists in DB
        let userCheck = await User.findOne({'email': req.body.email})
        if (userCheck) {
            throw customErrors.userExists
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)


        // Auto sets submitted "isAdmin" to false
        req.body.isAdmin = false

        const newUser = await User.create(req.body)
        let token = jwt.sign({
            userId: newUser._id,
            isAdmin: newUser.isAdmin
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'
        })

        res.status(201).send({newUser, JWT: token})
    }
    catch (err) {
        next(err)
    }
})

// Create a user as admin
router.post(`${usersPrefix}/admin`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth
        
        if (!isAdmin) {
            throw customErrors.authError
        }

        // Check if user exists in DB
        let userCheck = await User.findOne({'email': req.body.email})
        if (userCheck) {
            throw customErrors.userExists
        }

        const newUser = await User.create(req.body)
        res.status(201).send(newUser)
    }
    catch (err) {
        next(err)
    }
})

// Update a user
router.patch(`${usersPrefix}/:id`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth
        
        if (req.params.id.length < 24) {
            throw customErrors.shortId
        }

        if (!isAdmin || req.params.id == userId) {
            throw customErrors.authError
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )

        console.log(user)
               
        if (user) {
            let token = jwt.sign({
                userId: user._id,
                isAdmin: user.isAdmin
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'
            })
            res.status(200).send({user, JWT: token})
        } else {
            throw customErrors.noUser
        }
    }
    catch (err) {
        next(err)
    }    
})

// Delete a User
router.delete(`${usersPrefix}/:id`, async (req, res, next) => {
    try {
        let { userId, isAdmin } = req.auth
        
        if (!isAdmin || req.params.id == userId) {
            throw customErrors.authError
        }

        const user = await User.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (user) {
            res.status(200).send({Success: "User deleted"})
        } else {
            throw customErrors.noUser
        }
    }
    catch (err) {
        next(err)
    }    
})

export default router