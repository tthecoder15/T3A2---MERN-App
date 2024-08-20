import mongoose from "mongoose"
import { User } from "./models/usersModel.js"
import { Pet } from "./models/petsModel.js"
import { Vet } from "./models/vetsModel.js"
import { Appointment } from "./models/appointmentsModel.js"
import { dbConnect } from "./db.js"

async function seedDatabase() {
    try {
        await dbConnect();

        const seedUsers = [
            { email: "johnseesstars@gmail.com", password: "starrynight", firstName: "John", lastName: "Starsson", isAdmin: false, phNumber: '0411222333'},
            { email: "marylou@gmail.com", password: "marymare", firstName: "Mary", lastName: "Knights", isAdmin: false, phNumber: '0422333444'},
            { email: "jerry-d@gmail.com", password: "jerryDon", firstName: "Jerry", lastName: "Donald", isAdmin: false, phNumber: '0433444555'},
            { email: "pawfectcare@gmail.com", password: "admin123", firstName: "Admin", lastName: "Adminson", isAdmin: true, phNumber: '0444444444'}
        ];

        await User.deleteMany();
        console.log("Previously recorded Users deleted");
        let savedUsers = await User.insertMany(seedUsers);
        console.log("Users seeded");
       
        const seedPets = [
            { userId: savedUsers[0]._id, petName: "Captain Wiggles", birthYear: 2015, breed: "Labrador", animalType: "dog"},
            { userId: savedUsers[1]._id, petName: "Senorita Awesome", birthYear: 2023, breed: "Blue Russian", animalType: "cat"},
            { userId: savedUsers[2]._id, petName: "Mr Nibbles", birthYear: 2023, breed: "Rat", animalType: "other"},
            { userId: savedUsers[2]._id, petName: "Ms Bites-a-lot", birthYear: 2023, breed: "Rat", animalType: "other"}
        ];
        
        await Pet.deleteMany();
        console.log("Previously recorded Pets dropped");
        let savedPets = await Pet.insertMany(seedPets);
        console.log("Pets seeded");

        const seedVets = [
            { vetName: "Dr Riley Kim"},
            { vetName: "Dr Ethan Walker"},
            { vetName: "Dr Jess Taylor"}
        ];
        
        await Vet.deleteMany();
        console.log("Previously recorded Vets dropped");
        let savedVets = await Vet.insertMany(seedVets);
        console.log("Vets seeded");

        const seedAppointments = [
            { userId: savedUsers[0]._id, vetId: savedVets[0]._id, petId: savedPets[0]._id, date: new Date("2024-12-01T10:30"), appointmentType: "check-up" },
            { userId: savedUsers[1]._id, vetId: savedVets[0]._id, petId: savedPets[1]._id, date: new Date(2024, 12, 1, 10, 0, 0), appointmentType: "vaccination" },
            { userId: savedUsers[2]._id, vetId: savedVets[1]._id, petId: savedPets[2]._id, date: new Date(2024, 12, 1, 9, 0), appointmentType: "check-up" },
            { userId: savedUsers[2]._id, vetId: savedVets[1]._id, petId: savedPets[3]._id, date: new Date(2024, 12, 1, 9, 15), appointmentType: "check-up" }
        ];

        console.log('YAR THIS BE THE SEED APPOINTMENTS!', seedAppointments)
        await Appointment.deleteMany();
        console.log("Previously recorded Appointments dropped");
        let savedAppointments= await Appointment.insertMany(seedAppointments);
        console.log("Appointments seeded");

        // Add appointments to pets
        savedPets[0].appointments.push(savedAppointments[0]._id);
        savedPets[1].appointments.push(savedAppointments[1]._id);
        savedPets[2].appointments.push(savedAppointments[2]._id);
        savedPets[3].appointments.push(savedAppointments[3]._id);

        // Add appointments to vets
        savedVets[0].appointments.push(savedAppointments[0]._id);
        savedVets[0].appointments.push(savedAppointments[1]._id);
        savedVets[1].appointments.push(savedAppointments[2]._id);
        savedVets[1].appointments.push(savedAppointments[3]._id);

        // Add pets to users
        savedUsers[0].pets.push(savedPets[0]._id);
        savedUsers[1].pets.push(savedPets[1]._id);
        savedUsers[2].pets.push(savedPets[2]._id);
        savedUsers[2].pets.push(savedPets[3]._id);

        // Add appointments to users
        savedUsers[0].appointments.push(savedAppointments[0]._id);
        savedUsers[1].appointments.push(savedAppointments[1]._id);
        savedUsers[2].appointments.push(savedAppointments[2]._id);
        savedUsers[2].appointments.push(savedAppointments[3]._id);

        for (let pet of savedPets) {
            let update = await Pet.findOneAndUpdate({_id: pet._id}, {appointments: pet.appointments}, {new: true})
        }

        for (let vet of savedVets) {
            let update = await Vet.findOneAndUpdate({_id: vet._id}, {appointments: vet.appointments}, {new: true})
        }

        for (let user of savedUsers) {
            let update = await User.findOneAndUpdate({_id: user._id}, {appointments: user.appointments, pets: user.pets}, {new: true})
        }

        await mongoose.disconnect();
        console.log('Disconnected from db');
        
    } catch (err) {
        console.error(err);
        await mongoose.disconnect();
        console.log('Disconnected from db');
    }   

}

seedDatabase();
