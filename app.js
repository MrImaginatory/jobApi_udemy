import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';

// routesImport
import authRouter from './routes/auth.route.js';
import jobRouter from './routes/job.route.js';

const app = express();

app.set('trust proxy',1);
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:100,
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/auth',authRouter);
app.use('/jobs',jobRouter)

export {app}
