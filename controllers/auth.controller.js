import userSchema from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import asyncWrapper from '../utils/asyncWrapper.js'

const login = asyncWrapper(async(req,res)=>{
    const {name, email, password} = req.body;

    if(!email||!password||!name){
        return res.status(400).json({message:"Please Provide all details"});
    }

    const userExists = await userSchema.findOne({email:email});
    

    if(userExists){
        const isMatched = await userExists.comparePassword(password);
        if(isMatched){
            const token = jwt.sign({userEmail:email,userName:name,_id:userExists._id},process.env.JWT_SECRET,{expiresIn:'2d'});
            res.cookie('jwtToken', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000,
              })
            res.status(200).json({message:"Login Success",jwtToken:token});
        }
    }

    return res.status(404).json({message:"Invalid Credentials!"});

}) 

const signUp = asyncWrapper(async(req,res)=>{
    const {name, email, password} = req.body;

    if(!email||!password||!name){
        return res.status(400).json({message:"Please Provide all details"});
    }

    const userExists = await userSchema.findOne({email:email});
    if (userExists) {
        return res.status(401).json({message:"Existing User Please SignIn"});
    }

    const user = new userSchema({name:name,email:email,password:password});

    await user.save();

    return res.status(200).json({message:"User created Successfully"});
})

export {signUp,login}