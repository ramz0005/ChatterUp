import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.MONGODB || '0.0.0.0:27017';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb://${baseUrl}/ChatterApp`);
        console.log("Connected to MongoDB using Mongoose");
    } catch (error) {
        console.log(error);
    }
}