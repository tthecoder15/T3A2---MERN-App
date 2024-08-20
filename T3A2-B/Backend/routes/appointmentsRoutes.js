import { Router } from "express"
import { Category, Entry } from "../db.js"

const router = Router()

// Get list of categories
router.get('/categories', async (req, res) => {
    res.send(await Category.find())
})

// Get single category
router.get('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findById(
            req.params.id
        )
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({error: "Category not found"})
        }
    }
    catch (err) {
        res.status(400).send(err)
    }   
})

// Get entries group by category
router.get('/categories/:id/entries', async (req, res) => {
    try {
        let entries = await Entry.find({category: req.params.id})
        res.send(entries)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        // Get the body of the request
        // console.log(req.body)
        // Validate the input
        // Create a new category object
        // Add it to the array/db
        const newCategory = await Category.create(req.body)
        // Respond to the client with the new category
        res.status(201).send(newCategory)}
    catch (err) {
        res.status(400).send(err)
    }
})

// Update an category
router.put('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({error: "Category not found"})
        }
    }
    catch (err) {
        res.status(400).send({Error: err.message})
    }    
})

// Delete an category
router.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id, req.body, {returnDocument: 'after'}
        )
        if (category) {
            res.status(200).send({Success: "Category deleted"})
        } else {
            res.status(404).send({error: "Category not found"})
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }    
})

export default router