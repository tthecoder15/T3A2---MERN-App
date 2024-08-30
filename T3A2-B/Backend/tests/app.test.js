import request from "supertest";
import app from "../app.js";
import { dbConnect } from "../db.js";
import mongoose from "mongoose";

beforeAll(async () => await dbConnect())

describe("Test endpoints that don't require JWT", () => {
    test('GET /appointments-list', async () => {
        const res = await request(app).get('/appointments-list')
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body[0]._id).toBeDefined()
        expect(res.body).toBeInstanceOf(Array)
    })

    test('GET /vets-list', async () => {
        const res = await request(app).get('/vets-list')
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toContain('application/json')
        expect(res.body[0]._id).toBeDefined()
        expect(res.body[0].vetName).toBeDefined()
        expect(res.body[0].appointments).toBeInstanceOf(Array)
        expect(res.body).toBeInstanceOf(Array)
    })

    test('POST /users/login returns JWT', async () => {
        let res
        let userCreds = {
            email: "johnseesstars@gmail.com",
            password: "starrynight"
        }
        res = await request(app).post('/users/login').send(userCreds)
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toContain('json')
        expect(res.body.JWT).toBeDefined()
    })
})

describe("Test User login endpoints", () => {
    test('GET /users as seed user John Starsson', async () => {
        let res
        let userCreds = {
            email: "johnseesstars@gmail.com",
            password: "starrynight"
        }
        res = await request(app).post('/users/login').send(userCreds)
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toContain('json')
        const token = await res.body.JWT
        res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body._id).toBeDefined()
        expect(res.body.firstName).toBe('John')
        expect(res.body.lastName).toBe('Starsson')
    })

    test('GET multiple users from /users as seed admin', async () => {
        let res
        let userCreds = {
            "email": "pawfectcare@gmail.com",
            "password": "admin123"
        }
        res = await request(app).post('/users/login').send(userCreds)
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toContain('json')
        const token = await res.body.JWT
        res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
        
        const allUsersHaveId = res.body.some(user => user.hasOwnProperty('_id'))
        expect(allUsersHaveId).toBe(true)
    })
})

describe("test /users endpoints", () => {
    let postUser
    let loginRes
    let token
    let userPost
    let updateRes
    let updatedLoginRes
    let updateObj
    let userId
    let deleteRes
    test('POST /users', async () => {
        userPost = {
            "email": "greg@cat.com",
            "password": "greg",
            "firstName": "Noel",
            "lastName": "Sticklet",
            "phNumber": "0488999101",
        }
        postUser = await request(app).post('/users').send(userPost)
        expect(postUser.status).toBe(201)
        expect(postUser.headers["content-type"]).toContain('json')
        expect(postUser.body.newUser).toBeDefined()
        userId = postUser.body.newUser._id
    })

    test('POST /users/login new user', async () => {
        loginRes = await request(app).post('/users/login').send({"email": "greg@cat.com", password: "greg"})
        token = loginRes.body.JWT

    })
    

    test('PATCH /users new user', async () => {
        updateObj = {
            "email": "greg@dog.com",
            "password": "gregdog",
            "firstName": "Mikey",
            "lastName": "Bridges",
            "phNumber": "0488999101",
        }
        
        updateRes = await request(app).patch(`/users/${userId}`).set('Authorization', `Bearer ${token}`).send(updateObj)
        expect(updateRes.status).toBe(200)
        expect(updateRes.body.firstName).toBe("Mikey")
        expect(updateRes.body.email).toBe("greg@dog.com")
    })


    test('POST /users/login with updated email and password', async () => {
        updatedLoginRes = await request(app).post('/users/login').send({email: updateObj.email, password: updateObj.password})
        expect(updatedLoginRes.status).toBe(200)
    })

    test('DELETE /users/:id', async () => {
        deleteRes = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`)
        expect(deleteRes.status).toBe(200)
    })
})

describe("test /vets endpoints", () => {
    let loginRes
    let token
    let postVet
    let vetPostBody
    let updateVet
    let updateRes
    let deleteRes
    let vetId
    
    test('POST /users/login admin', async () => {
        loginRes = await request(app).post('/users/login').send({"email": "pawfectcare@gmail.com", password: "admin123"})
        token = loginRes.body.JWT
    })

    test('POST /vets create vet', async () => {
        vetPostBody = {
            "vetName": "Dr Ace Ventura"
        }
        postVet = await request(app).post('/vets').send(vetPostBody).set('Authorization', `Bearer ${token}`)
        expect(postVet.status).toBe(201)
        expect(postVet.headers["content-type"]).toContain('json')
        expect(postVet.body._id).toBeDefined()
        vetId = postVet.body._id
    })
    
    test('PATCH /vets new vet', async () => {
        updateVet = {
            "vetName": "Dr Dolittle"
        }
        updateRes = await request(app).patch(`/vets/${vetId}`).set('Authorization', `Bearer ${token}`).send(updateVet)
        expect(updateRes.status).toBe(200)
        expect(updateRes.body.vetName).toBe("Dr Dolittle")
        expect(updateRes.body._id).toBe(vetId)
    })

    test('POST /vets as non-admin fails', async () => {
        let userLogin = await request(app).post('/users/login').send({email: "johnseesstars@gmail.com", password: "starrynight"})
        expect(userLogin.status).toBe(200)
        expect(userLogin.body.JWT).toBeDefined()
        let userJWT = userLogin.body.JWT
        let userPostRes = await request(app).post('/vets').send({"vetName": "I'm the Doctor Now"}).set('Authorization', `Bearer ${userJWT}`)
        expect(userPostRes.status).toBe(403)
    })

    test('DELETE /vets/:id', async () => {
        deleteRes = await request(app).delete(`/vets/${vetId}`).set('Authorization', `Bearer ${token}`)
        expect(deleteRes.status).toBe(200)
    })
})

describe("test /pets endpoints", () => {
    let loginRes
    let userId
    let token
    let getUser
    let getPets
    let postPet
    let petPost
    let getPets2
    let updatepet
    let updateRes
    let getPets3
    let deleteRes
    let petId
    
    test('POST /users/login seed user', async () => {
        loginRes = await request(app).post('/users/login').send({"email": "johnseesstars@gmail.com", password: "starrynight"})
        token = loginRes.body.JWT
    })

    test('GET /users with seed user credentials', async () => {
        getUser = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(getUser.status).toBe(200)
        userId = getUser.body._id
    })

    test('GET /pets, JWT from seed user', async () => {
        getPets = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
        expect(getPets.status).toBe(200)
        expect(getPets.body).toBeInstanceOf(Array)
        const pets = getPets.body
        pets.forEach((pet) => {
            expect(pet).toHaveProperty('_id')
            expect(pet).toHaveProperty('petName')
            expect(pet).toHaveProperty('appointments')
        })
        petId = pets[0]._id
    })

    test('POST /pets, create pet as User', async () => {
        petPost = {
            userId: userId,
            petName: "Clifford",
            animalType: "dog",
            breed: "Vizslas",
            birthYear: 2020
        }
        postPet = await request(app).post('/pets').send(petPost).set('Authorization', `Bearer ${token}`)
        expect(postPet.status).toBe(201)
        expect(postPet.headers["content-type"]).toContain('json')
        expect(postPet.body._id).toBeDefined()
        expect(postPet.body.petName).toBe('Clifford')
        petId = postPet.body._id
    })

    test("GET /users, new posted Dog is in user's list of pets", async () => {
        getPets2 = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
        expect(getPets2.status).toBe(200)
        expect(getPets2.body).toBeInstanceOf(Array)
        const pets = getPets2.body
        let newPet = pets.find((pet) => {return pet._id == petId
        })
        expect(newPet).toBeDefined()
        expect(newPet.petName).toBe('Clifford')
    })
    
    test('PATCH /pets new pet', async () => {
        updatepet = {
            petName: "Scooby-Doo",
            breed: "Great Dane"
        }
        updateRes = await request(app).patch(`/pets/${petId}`).set('Authorization', `Bearer ${token}`).send(updatepet)
        expect(updateRes.status).toBe(200)
        expect(updateRes.body.petName).toBe("Scooby-Doo")
        expect(updateRes.body._id).toBe(petId)
    })

    test("GET /users, newly updated Dog is in user's list of pets with correct name", async () => {
        getPets3 = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
        expect(getPets3.status).toBe(200)
        expect(getPets3.body).toBeInstanceOf(Array)
        const pets = getPets3.body
        let updatedPet = pets.find((pet) => {return pet._id == petId
        })
        expect(updatedPet).toBeDefined()
        expect(updatedPet.petName).toBe('Scooby-Doo')
        expect(updatedPet.breed).toBe('Great Dane')
    })

    test('PATCH /pets when not registered to user fails', async () => {
        let user2Login = await request(app).post('/users/login').send({email: "marylou@gmail.com", password: "marymare"})
        expect(user2Login.status).toBe(200)
        expect(user2Login.body.JWT).toBeDefined()
        let notUserJWT = user2Login.body.JWT
        let unauthPatch = await request(app).patch(`/pets/${petId}`).set('Authorization', `Bearer ${notUserJWT}`).send({petName: "Scrappy-Doo"})
        expect(unauthPatch.status).toBe(403)
    })

    test('DELETE /pets/:id', async () => {
        deleteRes = await request(app).delete(`/pets/${petId}`).set('Authorization', `Bearer ${token}`)
        expect(deleteRes.status).toBe(200)
    })
})

describe("test /appointments endpoints", () => {
    let loginRes
    let token
    let getUser
    let userId
    let petId
    let getVet
    let vetId
    let vetId2
    let getAppointments
    let postAppointment
    let appointmentPost
    let appointmentId

    let updateAppointment
    let deleteAppointment
    
    test('POST /users/login seed user', async () => {
        loginRes = await request(app).post('/users/login').send({"email": "johnseesstars@gmail.com", password: "starrynight"})
        token = loginRes.body.JWT
    })

    test('GET /users with seed user credentials', async () => {
        getUser = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(getUser.status).toBe(200)
        userId = getUser.body._id
        petId = getUser.body.pets[0]._id
    })

    test('GET /vets with seed user credentials', async () => {
        getVet = await request(app).get('/vets').set('Authorization', `Bearer ${token}`)
        expect(getVet.status).toBe(200)
        vetId = getVet.body[0]._id
        vetId2 = getVet.body[1]._id
    })

    test('GET /appointments, JWT from seed user', async () => {
        getAppointments = await request(app).get('/appointments').set('Authorization', `Bearer ${token}`)
        expect(getAppointments.status).toBe(200)
        expect(getAppointments.body).toBeInstanceOf(Array)
        const appointments = getAppointments.body
        appointments.forEach((appointment) => {
            expect(appointment).toHaveProperty('_id')
            expect(appointment).toHaveProperty('petId')
            expect(appointment).toHaveProperty('userId')
            expect(appointment).toHaveProperty('vetId')
            expect(appointment).toHaveProperty('date')
        })
    })

    test('POST /appointments, create appointment as User', async () => {
        appointmentPost = {
            userId: userId,
            vetId: vetId,
            petId: petId,
            date: new Date(2025, 6, 5, 10, 0, 0),
            appointmentType: "check-up"
        }
        postAppointment = await request(app).post('/appointments').send(appointmentPost).set('Authorization', `Bearer ${token}`)
        expect(postAppointment.status).toBe(201)
        expect(postAppointment.headers["content-type"]).toContain('json')
        expect(postAppointment.body._id).toBeDefined()
        expect(postAppointment.body.petId).toBe(petId)
        appointmentId = postAppointment.body._id
    })

    test("GET /users, new posted Appointment is in user's list of appointments", async () => {
        let getUsers2 = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(getUsers2.status).toBe(200)
        const retAppointments = getUsers2.body.appointments
        let newAppt = retAppointments.find((appt) => {return appt._id == appointmentId
        })
        expect(newAppt).toBeDefined()
        expect(newAppt.date).toBe(`${new Date(2025, 6, 5, 10, 0, 0).toISOString()}`)
    })

    test("GET /pets, new posted Appointment is in pet's list of appointments", async () => {
        let getPet = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
        expect(getPet.status).toBe(200)
        expect(getPet.body).toBeInstanceOf(Array)
        const retPets = getPet.body
        let selectedPet = retPets.find((pet) => {return pet._id == petId
        })
        let newAppt = selectedPet.appointments.find((appt) => {return  appt._id == appointmentId})
        expect(newAppt).toBeDefined()
        expect(newAppt.date).toBe(`${new Date(2025, 6, 5, 10, 0, 0).toISOString()}`)
        expect(newAppt.vetId._id).toBe(vetId)
    })

    test("GET /vets, new posted Appointment is in vet's list of appointments", async () => {
        let authLogin = await request(app).post('/users/login').send({"email": "pawfectcare@gmail.com", password: "admin123"})
        expect(authLogin.status).toBe(200)
        let adminToken = authLogin.body.JWT
        let getVets = await request(app).get('/vets').set('Authorization', `Bearer ${adminToken}`)
        expect(getVets.status).toBe(200)
        expect(getVets.body).toBeInstanceOf(Array)
        const retVets = getVets.body
 
        let selectedVet = retVets.find((vet) => {return vet._id == vetId
        })
        let newAppt = selectedVet.appointments.find((appt) => {return appt._id == appointmentId
        })
        expect(newAppt).toBeDefined()
        expect(newAppt.date).toBe(`${new Date(2025, 6, 5, 10, 0, 0).toISOString()}`)
    })
    
    test('PATCH /appointments new appointment', async () => {
        let updateApptBody = {
            vetId: vetId2
        }
        
        updateAppointment = await request(app).patch(`/appointments/${appointmentId}`).set('Authorization', `Bearer ${token}`).send(updateApptBody)
        expect(updateAppointment.status).toBe(200)

        expect(updateAppointment.body.vetId).toBe(vetId2)
        expect(updateAppointment.body._id).toBe(appointmentId)
    })

    test("GET /users, newly updated appointment is in user's list of appointments with vetId", async () => {
        let getUsers3 = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(getUsers3.status).toBe(200)
        const appointments = getUsers3.body.appointments
        let updatedAppt = appointments.find((appt) => {return appt._id == appointmentId
        })
        expect(updatedAppt).toBeDefined()
    })

    test("GET /pets, newly updated Appointment is in pet's list of appointments", async () => {
        let getPet = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
        expect(getPet.status).toBe(200)
        expect(getPet.body).toBeInstanceOf(Array)
        const retPets = getPet.body
        let selectedPet = retPets.find((pet) => {return pet._id == petId
        })
        let newAppt = selectedPet.appointments.find((appt) => {return  appt._id == appointmentId})
        expect(newAppt).toBeDefined()
        expect(newAppt.date).toBe(`${new Date(2025, 6, 5, 10, 0, 0).toISOString()}`)
        expect(newAppt.vetId._id).toBe(vetId2)
    })

    // test("GET /vets, updated Appointment is in new vet's list of appointments and not in old vet's", async () => {
        
    //     let authLogin = await request(app).post('/users/login').send({"email": "pawfectcare@gmail.com", password: "admin123"})
    //     expect(authLogin.status).toBe(200)
    //     let adminToken = authLogin.body.JWT
    //     let getVets = await request(app).get('/vets').set('Authorization', `Bearer ${adminToken}`)
    //     expect(getVets.status).toBe(200)
    //     expect(getVets.body).toBeInstanceOf(Array)
    //     const retVets = getVets.body
    //     let selectedVet = retVets.find((vet) => {return vet._id == vetId2
    //     })
    //     console.log('selected Vet', selectedVet)
        
    //     console.log(appointmentId)
    //     let newAppt = selectedVet.appointments.find((appt) => {return appt._id == appointmentId
    //     })
        
        
    //     expect(newAppt).toBeDefined()
    //     expect(newAppt.date).toBe(`${new Date(2025, 6, 5, 10, 0, 0).toISOString()}`)
    //     expect(newAppt.vetId).toBe(vetId2)
    //     let oldVet = retVets.find((vet) => {return vet._id == vetId})
    //     expect(oldVet.appointments).not.toEqual(expect.arrayContaining(appointmentPost))
    // })

    // test('PATCH /appointments when not registered to user fails', async () => {
    //     let user2Login = await request(app).post('/users/login').send({email: "marylou@gmail.com", password: "marymare"})
    //     expect(user2Login.status).toBe(200)
    //     expect(user2Login.body.JWT).toBeDefined()
    //     let notUserJWT = user2Login.body.JWT
    //     let unauthPatch = await request(app).patch(`/appointments/${appointmentId}`).set('Authorization', `Bearer ${notUserJWT}`).send({vetId: vetId})
    //     expect(unauthPatch.status).toBe(403)
    // })

    // test('DELETE /appointments/:id', async () => {
    //     deleteAppointment = await request(app).delete(`/appointments/${appointmentId}`).set('Authorization', `Bearer ${token}`)
    //     expect(deleteAppointment.status).toBe(200)
    // })

    // let updatedAppointmentPost = {
    //     userId: userId,
    //     vetId: vetId2,
    //     petId: petId,
    //     date: new Date(2025, 6, 5, 10, 0, 0)
    // }

    // test("GET /users, deleted Appointment is not in user's list of appointments", async () => {
    //     let getUsers4 = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
    //     expect(getUsers4.status).toBe(200)
    //     const appointments = getUsers4.body.appointments
    //     expect(appointments).toBeDefined()
    //     expect(appointments).not.toEqual(expect.arrayContaining(appointmentPost))
    // })

    // test("GET /pets, deleted Appointment is not in pets's list of appointments", async () => {
    //     let getPet2 = await request(app).get('/pets').set('Authorization', `Bearer ${token}`)
    //     expect(getPet2.status).toBe(200)
    //     expect(getPet2.body).toBeInstanceOf(Array)
    //     const retPets = getPet2.body
    //     expect(retPets.appointments).toBeDefined()
    //     expect(retPets.appointments).not.toEqual(expect.arrayContaining(appointmentPost))
    // })

    // test("GET /vets, deleted Appointment is not in vet's list of appointments", async () => {
    //     let authLogin = await request(app).post('/users/login').send({"email": "pawfectcare@gmail.com", password: "admin123"})
    //     expect(authLogin.status).toBe(200)
    //     let adminToken = authLogin.body.JWT
    //     let getVets = await request(app).get('/vets').set('Authorization', `Bearer ${adminToken}`)
    //     expect(getVets.status).toBe(200)
    //     expect(getVets.body).toBeInstanceOf(Array)
    //     const retVets = getVets.body
    //     let checkVet = retVets.find((vet) => {return vet._id == vetId2
    //     })
    //     expect(checkVet).toBeDefined()
    //     expect(checkVet.appointments).not.toEqual(expect.arrayContaining(appointmentPost))
    // })

})

afterAll(async () => {
    await mongoose.disconnect();
})

