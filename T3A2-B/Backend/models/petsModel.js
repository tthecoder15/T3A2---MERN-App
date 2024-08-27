import mongoose, { Schema } from "mongoose";
import { User } from "./usersModel.js";

const petSchema = new Schema({
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
    petName: {type: String, required: true},
    birthYear: {
        type: Number, 
        required: true,
        validate: {
            validator: async function (year) {
                let thisYear = (new Date).getFullYear()
                if (year >= 2000 && year <= thisYear) {
                    return true
                }
                else {
                    return false
                }
            },
            message: props => `${props.value} is an invalid birth year. Please enter a birth year after 2000 and not past the current year.`
        }
    },
    breed: {type: String, required: true},
    animalType: {type: String, required: true, enum: {values: ['dog', 'cat', 'other'], message: "animalType must be one of 'dog', 'cat' or 'other'."}},
    appointments: [{type: mongoose.Types.ObjectId, ref: 'Appointment'}],
});

const Pet = mongoose.model('Pet', petSchema)

export { petSchema, Pet }