import { Router } from "express";
import tokenCheck from '../middlewares/tokenCheck.middleware.js'
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.use(tokenCheck);

jobRouter.route('/createJob').post(createJob);
jobRouter.route('/getAllJobs').get(getAllJobs);
jobRouter.route('/getJob/:jobId').get(getJob);
jobRouter.route('/updateJob/:jobId').patch(updateJob);
jobRouter.route('/deleteJob/:jobId').delete(deleteJob);

export default jobRouter;