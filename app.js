import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';
import jobRouter from './routes/job.route.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth',authRouter);
app.use('/jobs',jobRouter)

export {app}
