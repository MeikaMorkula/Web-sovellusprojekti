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
  getUserGroups,
  fetchGroupRequests,
  removeGroupRequest,
} from "../controllers/group_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const groupRouter = Router();

groupRouter.get("/getGroups", getGroups);
groupRouter.get("/getGroup/:id", getGroup);
groupRouter.post("/addGroup", addGroup);
groupRouter.delete("/deleteGroup/:id", deleteGroup);
groupRouter.put("/:id/uploads", uploadGroupPicture);
groupRouter.get("/getGroupIcon/:id", fetchGroupIcon);
groupRouter.post("/uploadGroupFavouriteMovie/:id", uploadGroupFavouriteMovie);
groupRouter.post("/requestGroupJoin", requestGroupJoin);
groupRouter.post("/addUserToGroup", addUserToGroup);
groupRouter.get("/user/:id/groups", getUserGroups);

groupRouter.post("/getGroupRequests/:id", fetchGroupRequests);
groupRouter.delete("/removeGroupRequest/:id", removeGroupRequest);

export default groupRouter;
