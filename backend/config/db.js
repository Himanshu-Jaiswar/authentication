import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) { 
        console.log("Failed to connect to db", error);
    }
}

export default connectDB