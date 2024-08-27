import mongoose, { Schema } from "mongoose";
import { User } from "./usersModel.js";
import { Vet } from "./vetsModel.js";
import { Pet } from "./petsModel.js";

const appointmentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'User',
        validate: {
            validator: async function (id) {
                let user = await User.findById(id)
                if (user) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is not a registered userID`
        }
    },
    vetId: {
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'Vet',
        validate: {
            validator: async function (id) {
                let user = await Vet.findById(id)
                if (user) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is not a registered vetID`
        }
    },
    petId: {
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
    },
    date: {type: Date, required: true},
    appointmentType: {type: String, required: true, enum: {values: ['check-up', 'dental', 'vaccination', 'surgery', 'other'], message: "Appointment type must be one of 'check-up', 'dental', 'vaccination', 'surgery' or 'other'."}} 
});

const Appointment = mongoose.model('Appointment', appointmentSchema)

export { appointmentSchema, Appointment }