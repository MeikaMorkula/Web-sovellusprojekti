import { Router } from "express";
import { getFavourites, getFavourite, addFavourite, deleteFavourite } from "../controllers/favourites_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const favouriteRouter = Router();

favouriteRouter.get("/getFavourites", authenticateToken, getFavourites);
favouriteRouter.post("/getFavourite", getFavourite);
favouriteRouter.post("/addFavourite", authenticateToken, addFavourite);
favouriteRouter.delete("/deleteFavourite:id", authenticateToken, deleteFavourite);

export default favouriteRouter;
