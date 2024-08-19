import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

async function dbConnect(){
    try {
        const m = await mongoose.connect(process.env.DB_URI)
        console.log(m.connection.readyState == 1 ? "Mongoose connected" : "Mongoose connection error")
    }

    catch (err) {
        console.error(err)
    }
}

export { dbConnect }