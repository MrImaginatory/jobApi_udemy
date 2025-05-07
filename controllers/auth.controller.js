import userSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "../utils/asyncWrapper.js";

const generateToken = (user) => {
    return jwt.sign(
        {
            userEmail: user.email,
            userName: user.name,
            _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    );
};

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    return res.status(200).json({ message: "Login successful", jwtToken: token });
});

const signUp = asyncWrapper(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    const userExists = await userSchema.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: "User already exists. Please login." });
    }

    const user = new userSchema({ name, email, password });
    await user.save();

    return res.status(201).json({ message: "User created successfully" });
});

export { signUp, login };