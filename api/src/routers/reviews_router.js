import { Router } from "express";
import { getReviews, getReviewsFromId, addReview, deleteReview } from "../controllers/reviews_controller.js";

const reviewRouter = Router();

reviewRouter.get("/getReviews", getReviews);
reviewRouter.get("/getReviews/:id", getReviewsFromId);
reviewRouter.post("/addReview",  addReview);
reviewRouter.delete("/deleteReview/:id", deleteReview);

export default reviewRouter;
