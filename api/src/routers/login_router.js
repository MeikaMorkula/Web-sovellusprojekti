import { Router } from "express";
import {login, refreshAccessToken, logout} from "../controllers/login_controller.js";
import { addUser } from "../controllers/user_controller.js";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/refresh", refreshAccessToken);
loginRouter.post("/logout", logout);
loginRouter.post("/register", addUser);


export default loginRouter;