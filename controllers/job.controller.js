import jobSchema from '../models/job.models.js'
import asyncWrapper from '../utils/asyncWrapper.js'

const createJob = asyncWrapper(async(req,res)=>{
    const {company,position,status} = req.body;
    const {_id} = req.user;

    if (!company||!position||!status) {
        return res.status(404).json({message:"Please Provide All Details"})
    }

    const job = new jobSchema({
            company:company,
            position:position,
            status:status,
            createdBy:_id
        })
    const savedJob = await job.save();

    if(!savedJob||savedJob.length <=0){
        return res.status(502).json({message:"Error Creating jobs try again later"});
    }

    res.status(200).json({message:"success",jobDetails:savedJob});
})

const getAllJobs = asyncWrapper(async(req,res)=>{
    const {_id} = req.user;
    
    const jobs = await jobSchema.find({createdBy:_id});

    if(!jobs || jobs.length <= 0){
        return res.status(404).json({message:"No Jobs Found Please Apply For one"});
    }

    return res.status(200).json({message:"Jobs",jobs})

})

const getJob = asyncWrapper(async(req,res)=>{
    const {_id} = req.user;
    const jobId = req.params.jobId;
    
    const jobs = await jobSchema.find({_id:jobId,createdBy:_id});

    if(!jobs || jobs.length <= 0){
        return res.status(404).json({message:"No Jobs Found Please Apply For one"});
    }

    return res.status(200).json({message:"Jobs",jobs})
})

const updateJob = asyncWrapper(async(req,res)=>{
    const jobId = req.params.jobId;
    const userId = req.user._id;
    const {status} = req.body;

    const jobExists = await jobSchema.findById({_id:jobId,createdBy:userId});
    
    
    if(!jobExists){
        return res.status(404).json({message:"Job not Found!"});
    }

    if (jobExists.createdBy.toString() !== userId.toString()){
        return res.status(404).json({message:"Unauthorized User Cannot update Tasks"});
    }


    const updateJob = await jobSchema.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        { status: status },
        { new: true }
    );

    if(!updateJob || updateJob.length <=0){
        return res.status(501).json({message:"Error Updating Task Try Again Later"});
    }

    return res.status(200).json({message:"Job Updated Successfully",updateJob});

})

const deleteJob = asyncWrapper(async(req,res)=>{
    const jobId = req.params.jobId;
    const userId = req.user._id;
    
    const jobExists = await jobSchema.findById({_id:jobId,createdBy:userId});

    console.log(jobExists);
    

    if (!jobExists) {
        return res.status(404).json({message:"Job does not Exists"});
    }

    if (jobExists.createdBy.toString() !== userId.toString()){
        return res.status(404).json({message:"Unauthorized User Cannot Delete Tasks"});
    }

    const deleteJob = await jobSchema.findOneAndDelete({_id:jobId,createdBy:userId});

    if(!deleteJob||deleteJob.length<=0 ){
        return res.status(501).json({message:"Error deleting the job try gain later"});
    }

    return res.status(200).json({message:"Job deleted SuccessFully",deleteJob})

})

export {createJob,getJob,getAllJobs,updateJob,deleteJob}