import { Router } from "express";
import { getFavourites, getFavourite, addFavourite, deleteFavourite } from "../controllers/favourites_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const favouriteRouter = Router();

favouriteRouter.get("/getFavourites:id", getFavourites);
favouriteRouter.post("/getFavourite", getFavourite);
favouriteRouter.post("/addFavourite", addFavourite);
favouriteRouter.delete("/deleteFavourite:id", deleteFavourite);

export default favouriteRouter;
