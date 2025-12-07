import { Router } from "express";
import {
  updatePassword,
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


//saa sen käyttäjän käyttämättä "id"
userRouter.get("/me", authenticateToken, async (req, res) => {
  res.json({ id: req.user.id });
});

userRouter.put("/:id/password", authenticateToken, updatePassword);

//Tämän alle suojatut routet
userRouter.get("/:id", authenticateToken, getUser);
userRouter.put("/:id", authenticateToken, updateUser);
userRouter.delete("/:id", authenticateToken, deleteUser);
userRouter.put("/:id/uploads", authenticateToken, updateUserPfp);
userRouter.get("/:id/uploads", authenticateToken, getUserPfp);



export default userRouter;
