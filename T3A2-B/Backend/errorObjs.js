const customErrors = {
    loginError: {
        code: 400, 
        message: {
            "error/s": ["login-error"], 
            "login-error": "Incorrect email or password provided. Please try again"
        }
    },
    authError: {
        code: 403,
        message: {
            "error/s": ["auth-error"], 
            "auth-error": "You are not authorised to access this resource."
        }
    },
    noInst: {
        code: 404,
        message: {
            "error/s": ["no-instance"],
            "no-instance": "Instance not found."
        }
    },
    userExists: {
        code: 400,
        message: {
            "error/s": ["user-exists"],
            "user-exists": "Cannot register user, a user is already registered with that email."
        }
    },
    vetExists: {
        code: 400,
        message: {
            "error/s": ["vet-exists"],
            "vet-exists": "Cannot register vet, a vet is already registered with that name."
        }
    },
    apptExists: {
        code: 400,
        message: {
            "error/s": ["appt-exists"],
            "appt-exists": "Cannot register appointment, the selected vet already has a booking at that time."
        }
    },
    petExists: {
        code: 400,
        message: {
            "error/s": ["pet-exists"],
            "pet-exists": "Cannot register pet, a pet with that name is already registered to this user."
        }
    },
    noUser: {
        code: 404,
        message: {
            "error/s": ["no-user"],
            "no-user": "No user with that ID found."
        }
    },
    noPet: {
        code: 404,
        message: {
            "error/s": ["no-pet"],
            "no-pet": "No pet with that ID found."
        }
    },
    noVet: {
        code: 404,
        message: {
            "error/s": ["no-vet"],
            "no-vet": "No vet with that ID found."
        }
    },
    noAppt: {
        code: 404,
        message: {
            "error/s": ["no-appointment"],
            "no-appointment": "No appointment with that ID found."
        }
    },
    shortId: {
        code: 400,
        message: {
            "error/s": ["shortID"],
            "shortID": "The ID parameter you provided is less than 12 characters long and invalid."
        }
    },

}

export default customErrors