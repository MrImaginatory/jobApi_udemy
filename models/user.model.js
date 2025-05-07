import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name Required!'],
        min:3,
        max:25,
    },
    email:{
        type:String,
        required:[true,'Email Required!'],
        unique:true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
        min:8
    }
},{timestamps:true})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword,this.password);
};

export default mongoose.model("user",userSchema);