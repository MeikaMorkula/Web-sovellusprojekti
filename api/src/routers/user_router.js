import { Router } from "express";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  updateUserPfp,
  getUserPfp,
} from "../controllers/user_controller.js";
import { authenticateToken } from "../middleware/auth.js";
const userRouter = Router();

userRouter.post("/register/", addUser);
//Tämän alle suojatut routet
userRouter.get("/:id", authenticateToken, getUser);
userRouter.put("/:id", authenticateToken, updateUser);
userRouter.delete("/:id", authenticateToken, deleteUser);
userRouter.put("/:id/uploads", authenticateToken, updateUserPfp);
userRouter.get("/:id/uploads", authenticateToken, getUserPfp);

export default userRouter;
