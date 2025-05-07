import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company Name required'],
        minlength:3,
        maxlength:50,
    },
    position:{
        type:String,
        required:[true,'Position required'],
        minlength:3,
        maxlength:50,
    },
    status:{
        type:String,
        required:[true,'Status required'],
        enum:['pending','interview','declined','accepted'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'Please Provide User']
    }
},{timestamps:true})

export default mongoose.model('job',jobSchema);