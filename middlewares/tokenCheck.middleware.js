import dotenv from 'dotenv/config';
import jwt from 'jsonwebtoken';
import asyncWrapper from '../utils/asyncWrapper.js';

const jwtSecret = process.env.JWT_SECRET;

const tokenCheck = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const cookieHeader = req.headers.cookie || "";

    let token = null;

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        
    } else {
        const match = cookieHeader.match(/jwtToken=([^;]+)/);
        if (match) {
            token = match[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    

    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
});

export default tokenCheck;
