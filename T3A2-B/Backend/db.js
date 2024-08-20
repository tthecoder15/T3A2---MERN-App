import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

async function dbConnect(){
    try {
        const m = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(m.connection.readyState == 1 ? "MongoDB connected" : "MongoDB connection error")
    }

    catch (err) {
        console.error(err)
    }
}

export { dbConnect }