import { getAll, addOne, deleteOne } from "../models/reviews_model.js";

export async function getReviews(req, res, next) {
  try {
    const review = await getAll(req.params.id);
    res.json(review);
  } catch (err) {
    next(err);
  }
}

export async function addReview(req, res, next) {
  try {
    const response = await addOne(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteReview(req, res, next) {
  try {
    const review = await deleteOne(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
}