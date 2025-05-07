import dotenv from 'dotenv/config'
import asyncWrapper from '../utils/asyncWrapper.js';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const tokenCheck = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const cookie = req.headers.cookie;

    const token = cookie.split('=')[1] || authHeader.split(" ")[1];
    
    if(!token || token===undefined || token.length<=0){
        return res.status(401).json({ message: "Unauthorized User" });
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