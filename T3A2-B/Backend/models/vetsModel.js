import mongoose, { Schema } from "mongoose";

const vetSchema = new Schema({
    vetName: {type: String, required: true},
    appointments: [{type: mongoose.Types.ObjectId, ref: 'Appointment'}]
});

const Vet = mongoose.model('Vet', vetSchema)

export { vetSchema, Vet }