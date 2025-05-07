import { Router } from "express";
import { login,signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/signUp').post(signUp);

export default authRouter;