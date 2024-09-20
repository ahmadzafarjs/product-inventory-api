import User from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export async function verifyUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Session expired! Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Session expired! Please log in again." });
        }
        
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user; 
        next(); 

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token!" });
        }
        return res.status(400).json({ message: error.message });
    }
}


export async function verifyApiKey(req, res, next) {
    try {
        const { apiKey } = req.query;

        if (!apiKey) {
            return res.status(401).json({ message: "API key is missing" });
        }

        const apiKeyFormat = /^[a-zA-Z0-9-]{36}$/;
        if (!apiKeyFormat.test(apiKey)) {
            return res.status(401).json({ message: "Invalid API key format" });
        }

        const findUser = await User.findOne({ apiKey });
 

        if (!findUser) {
            return res.status(401).json({ message: "Unauthorized. Invalid API key" });
        }

        if (!findUser.apiKey) {
            return res.status(401).json({ message: "API key not found. Please generate one." });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access: User ID not found in token" });
        }

        if (String(findUser._id) !== String(req.user.id)) {
            return res.status(403).json({
                message: "Unauthorized access! You do not have permission to use this API key."
            });
        }

        req.apiKey = apiKey;

        next();

    } catch (error) { 
        console.error("API key verification error:", error);
        return res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
}
