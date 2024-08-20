import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    vetId: {type: mongoose.Types.ObjectId, required: true, ref: 'Vet'},
    petId: {type: mongoose.Types.ObjectId, required: true, ref: 'Pet'},
    date: {type: Date, required: true},
    appointmentType: {type: String, required: true, enum: {values: ['check-up', 'dental', 'vaccination', 'surgery', 'other'], message: "Appointment type must be one of 'check-up', 'dental', 'vaccination', 'surgery' or 'other'."}} 
});

const Appointment = mongoose.model('Appointment', appointmentSchema)

export { appointmentSchema, Appointment }