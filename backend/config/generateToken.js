import jwt from "jsonwebtoken"
import { redisClient } from "../index.js";
import { generateCSRFToken, revokeCSRFToken } from "./csrfMiddlewares.js";


export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1m'});
    const refreshToken = jwt.sign({id}, process.env.REFRESH_SECRET, {expiresIn: '7d'});

    const refreshTokenKey = `refresh_token:${id}`;

    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const csrfToken = await generateCSRFToken(id, res);

    return {accessToken, refreshToken, csrfToken};
}

export const verifyRefreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const storedToken = await redisClient.get(`refresh_token:${decoded.id}`);


        if(storedToken === refreshToken){
            return decoded;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export const generateAccessToken = async (id, res) => {
    const accessToken = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1m"});

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 1000
    });
}

export const revokeRefreshToken = async (userId) => {
    await redisClient.del(`refresh_token:${userId}`);
    await revokeCSRFToken(userId);
}