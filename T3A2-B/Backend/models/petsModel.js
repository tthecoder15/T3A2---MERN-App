import mongoose, { Schema } from "mongoose";

const petSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    name: {type: String, required: true},
    birthYear: {type: Number, required: true},
    breed: {type: String, required: true},
    animalType: {type: String, required: true, enum: ['dog', 'cat', 'other']},
    appointments: [{type: mongoose.Types.ObjectId, ref: 'Appointment'}],
});

const Pet = mongoose.model('Pet', petSchema)

export { petSchema, Pet }