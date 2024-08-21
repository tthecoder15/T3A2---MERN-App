import express from "express";
import usersRoutes from "./routers/usersRoutes.js"
import vetsRoutes from "./routers/vetsRoutes.js"
import petsRoutes from "./routers/petsRoutes.js"
import appointmentsRoutes from "./routers/appointmentsRoutes.js"
import errorHandler from "./routers/errorHandler.js";
import { expressjwt } from "express-jwt";
import { dotenv } from "./db.js";

const app = express()
// const jwt = expressjwt({secret: 'lol', algorithms: ["HS256"]})

// Middleware
app.use(express.json())
app.use(expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true
}).unless({ path: ['/users/login'] }))



// Routes
app.get('/', (request, response) => {
    response.status(200)
        .json({info: "Pawfect Care API"})
    })

app.use(usersRoutes)
app.use(vetsRoutes)
app.use(petsRoutes)
app.use(appointmentsRoutes)
app.use(errorHandler)

export default app