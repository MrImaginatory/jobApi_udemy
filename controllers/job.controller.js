import jobSchema from '../models/job.models.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const createJob = asyncWrapper(async (req, res) => {
    const { company, position, status } = req.body;
    const { _id } = req.user;

    if (!company || !position || !status) {
        return res.status(400).json({ message: "Please provide all details" });
    }

    const job = new jobSchema({
        company,
        position,
        status,
        createdBy: _id
    });

    const savedJob = await job.save();

    if (!savedJob) {
        return res.status(500).json({ message: "Error creating job, try again later" });
    }

    return res.status(201).json({ message: `Job created successfully by ${req.user.userName}`, jobDetails: savedJob });
});

const getAllJobs = asyncWrapper(async (req, res) => {
    const { _id } = req.user;

    const jobs = await jobSchema.find({ createdBy: _id });

    return res.status(200).json({
        message: jobs.length ? `Jobs found of ${req.user.userName}` : "No jobs found",
        jobs
    });
});

const getJob = asyncWrapper(async (req, res) => {
    const { _id } = req.user;
    const jobId = req.params.jobId;

    const job = await jobSchema.findOne({ _id: jobId, createdBy: _id });

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: `Job found for ${req.user.userName}`, job });
});

const updateJob = asyncWrapper(async (req, res) => {
    const jobId = req.params.jobId;
    const userId = req.user._id;
    const { status } = req.body;

    const jobExists = await jobSchema.findById(jobId);

    if (!jobExists) {
        return res.status(404).json({ message: "Job not found" });
    }

    if (jobExists.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized user cannot update this job" });
    }

    const updatedJob = await jobSchema.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        { status },
        { new: true }
    );

    if (!updatedJob) {
        return res.status(500).json({ message: "Error updating job, try again later" });
    }

    return res.status(200).json({ message: `Job updated successfully by ${req.user.userName}`, job: updatedJob });
});

const deleteJob = asyncWrapper(async (req, res) => {
    const jobId = req.params.jobId;
    const userId = req.user._id;

    const jobExists = await jobSchema.findById(jobId);

    if (!jobExists) {
        return res.status(404).json({ message: "Job does not exist" });
    }

    if (jobExists.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized user cannot delete this job" });
    }

    const deletedJob = await jobSchema.findOneAndDelete({ _id: jobId, createdBy: userId });

    if (!deletedJob) {
        return res.status(500).json({ message: "Error deleting the job, try again later" });
    }

    return res.status(200).json({ message: `Job deleted successfully by ${req.user.userName}`, job: deletedJob });
});

export { createJob, getJob, getAllJobs, updateJob, deleteJob };
