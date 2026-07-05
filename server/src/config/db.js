import mongoose from "mongoose";
import config from './config.js';

export const connectDB = async () => {
    try {
        // Mongoose connect ke aage await lagana zaroori hai
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`DB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // Process ko fail safe ke sath band karne ke liye
    }
};
