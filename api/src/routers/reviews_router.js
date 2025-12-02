import { Router } from "express";
import { getReviews, addReview, deleteReview } from "../controllers/reviews_controller.js";

const reviewRouter = Router();

reviewRouter.get("/getReviews:id", getReviews);
reviewRouter.post("/addReview",  addReview);
reviewRouter.delete("/deleteReview:id", deleteReview);

export default reviewRouter;
