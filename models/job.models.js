import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company Name required'],
        min:3,
        max:50,
    },
    position:{
        type:String,
        required:[true,'Company Name required'],
        min:3,
        max:50,
    },
    status:{
        type:String,
        required:[true,'Company Name required'],
        min:3,
        enum:['pending','interview','declined'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'Please Provide User']
    }
},{timestamps:true})

export default mongoose.model('job',jobSchema);