import { Router } from "express";
import {login, refreshAccessToken, logout} from "../controllers/login_controller.js";
const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/refresh", refreshAccessToken);
loginRouter.post("/logout", logout);

export default loginRouter;