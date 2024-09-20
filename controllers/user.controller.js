import User from "./../models/user.model.js"
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from "bcryptjs"

export async function generateTokenAndStoreInCookies(res, id, email) {
    const token = jwt.sign({id, email} ,process.env.JWT_SECRET_KEY)
    res.cookie("token", token)
    return token
} 

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(204).json({message: "email and password is required."})
        }
        
        const checkUser = await User.findOne({email: email})
        
        if (checkUser) {
            return res.status(409).json({message: "user already exists."})
        }
        
        const newUser = await User.create({
            email, password
        })
        
        if (!newUser) {
            return res.status(400).json({message: "something went wrong! try again."})
        }

        generateTokenAndStoreInCookies(res, newUser._id, newUser.email)

        newUser.password = undefined

        return res.status(200).json({user: newUser})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(204).json({message: "email and password is required"})
        }
        
        const checkUser = await User.findOne({email: email})
        
        if (!checkUser) {
            return res.status(409).json({message: "user not found"})
        }
        
        if (checkUser.password !== password){
            return res.status(401).json({message: "password is incorrect"})
        }

        generateTokenAndStoreInCookies(res, checkUser._id, checkUser.email)

        checkUser.password = undefined

        return res.status(200).json({user: checkUser})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export async function generateApiKey(req, res) {
    try {
        const apiKey = uuidv4();

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { apiKey: apiKey },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        updatedUser.password = undefined

        return res.status(200).json({ user: updatedUser });
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}