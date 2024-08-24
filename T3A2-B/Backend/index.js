import app from './app.js'
import { dbConnect } from './db.js'

// Start the server
app.listen(process.env.PORT || 4001, err => {
    if (err) {
        console.error(err)
    } else {
        console.log('Server running')
        dbConnect()
    }
})