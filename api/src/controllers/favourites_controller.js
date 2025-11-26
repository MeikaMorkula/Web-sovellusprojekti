import { getAll, getOne, addOne, deleteOne } from "../models/favourites_model.js";

export async function getFavourites(req, res, next) {
  try {
    const favourites = await getAll();
    res.json(favourites);
  } catch (err) {
    next(err);
  }
}

export async function getFavourite(req, res, next) {
  try {
    const favourite = await getOne(req.params.id);
    if (!favourite) {
      return res.status(404).json({ error: "favourite not found" });
    }
    res.json(favourite);
  } catch (err) {
    next(err);
  }
}

export async function addFavourite(req, res, next) {
  console.log("add called");
  try {
    console.log(req.body);
    const response = await addOne(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteFavourite(req, res, next) {
  try {
    const favourite = await deleteOne(req.params.id);
    if (!favourite) {
      return res.status(404).json({ error: "favourite not found" });
    }
    res.json(favourite);
  } catch (err) {
    next(err);
  }
}