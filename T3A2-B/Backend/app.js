import express from "express";

const app = express()

// Middleware
app.use(express.json())

// Routes
app.get('/', (request, response) => {
    response.status(200)
        .json({info: "Pawfect Care API"})
    })

// app.use()
// app.use(entryRoutes)

export default app