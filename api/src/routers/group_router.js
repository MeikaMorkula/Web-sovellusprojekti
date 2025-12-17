import { Router } from "express";
import {
  getGroups,
  getGroup,
  addGroup,
  deleteGroup,
  uploadGroupPicture,
  uploadGroupFavouriteMovie,
  fetchGroupIcon,
  requestGroupJoin,
  addUserToGroup,
  getUserGroups
} from "../controllers/group_controller.js";

const groupRouter = Router();

groupRouter.get("/getGroups", getGroups);
groupRouter.get("/getGroup/:id", getGroup);
groupRouter.post("/addGroup", addGroup);
groupRouter.delete("/deleteGroup/:id", deleteGroup);
groupRouter.post("/uploadGroupPicture/:id", uploadGroupPicture);
groupRouter.get("/getGroupIcon/:id", fetchGroupIcon);
groupRouter.post("/uploadGroupFavouriteMovie/:id", uploadGroupFavouriteMovie);
groupRouter.post("/requestGroupJoin", requestGroupJoin);
groupRouter.post("/addUserToGroup", addUserToGroup);
groupRouter.get("/user/:id/groups", getUserGroups);


export default groupRouter;
