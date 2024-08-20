import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    pets: [{type: mongoose.Types.ObjectId, ref: 'Pet'}],
    appointments: [{type: mongoose.Types.ObjectId, ref: 'Appointment'}]
});

const User = mongoose.model('User', userSchema)

export { userSchema, User }