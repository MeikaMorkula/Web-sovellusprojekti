import { Router } from "express";
import { getFavourites, getFavourite, addFavourite, deleteFavourite } from "../controllers/favourites_controller.js";

const favouriteRouter = Router();

favouriteRouter.get("/getFavourites", getFavourites);
favouriteRouter.get("/getFavourite:id", getFavourite);
favouriteRouter.post("/addFavourite", addFavourite);
favouriteRouter.delete("/deleteFavourite:id", deleteFavourite);

export default favouriteRouter;
