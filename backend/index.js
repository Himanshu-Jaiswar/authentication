import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { createClient } from "redis"
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config();
const app = express();

await connectDB();

const redisURL = process.env.REDIS_URI;

if (!redisURL) {
    console.log("Missing redis url");
    process.exit(1);
}

export const redisClient = createClient({
    url: redisURL
})


redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis socket connected");
});

redisClient.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

await redisClient.connect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
}));

import userRoutes from './routes/userRoutes.js'
// using routes
app.use('/api/v1', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server is running on ${PORT}`);
});