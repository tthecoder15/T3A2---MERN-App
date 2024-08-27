import mongoose, { Schema } from "mongoose";
import { Pet } from "./petsModel.js";
import { Appointment } from "./appointmentsModel.js";

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        validate: {
            validator: async function (email) {
                console.log('email test')
                let eRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                if (eRegex.test(email)) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    phNumber: {type: String, required: true, minLength: 10, maxLength: 10},
    pets: [{
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'Pet',
        validate: {
            validator: async function (id) {
                let pet = await Pet.findById(id)
                if (pet) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is not a registered petID`
        }
    }],
    appointments: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Appointment',
        validate: {
            validator: async function (id) {
                let appt = await Appointment.findById(id)
                if (appt) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is not a registered appointmentID`
        }
    }]
});

const User = mongoose.model('User', userSchema)

export { userSchema, User }