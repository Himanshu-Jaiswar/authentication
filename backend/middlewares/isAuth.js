import jwt from "jsonwebtoken"
import { redisClient } from "../index.js";
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(403).json({
                message: "Please login - No token"
            });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
            return res.status(403).json({
                message: "token expired"
            });
        }

        const cacheUser = await redisClient.get(`user:${decodedData.id}`);
        if (cacheUser) {
            req.user = JSON.parse(cacheUser);
            return next();
        }

        const user = await User.findById(decodedData.id).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User does not exists"
            });
        }

        await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(user));

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const authorizedAdmin = async (req, res, next) => {
    const user = req.user;

    if(user.role !== "admin"){
        return res.status(401).json({
            message: "You are not allowed for this activity"
        });
    }

    next();
}