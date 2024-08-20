import express from "express";
import usersRoutes from "./routers/usersRoutes.js"
import vetsRoutes from "./routers/vetsRoutes.js"
import petsRoutes from "./routers/petsRoutes.js"
import appointmentsRoutes from "./routers/appointmentsRoutes.js"

const app = express()

// Middleware
app.use(express.json())

// Routes
app.get('/', (request, response) => {
    response.status(200)
        .json({info: "Pawfect Care API"})
    })

app.use(usersRoutes)
app.use(vetsRoutes)
app.use(petsRoutes)
app.use(appointmentsRoutes)

export default app