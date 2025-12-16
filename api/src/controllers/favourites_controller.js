import { getAll, getOne, addOne, deleteOne, getByUsername } from "../models/favourites_model.js";

export async function getFavourites(req, res, next) {
  try {
    const favourites = await getAll(req.params.id);
    res.json(favourites);
  } catch (err) {
    next(err);
  }
}

export async function getFavourite(req, res, next) {
  try {
    const favourite = await getOne(req.body);
   
    if (!favourite) {
      return res.status(404).json({ error: "favourite not found" });
    }
    res.json(favourite);
  } catch (err) {
    next(err);
  }
}

export async function addFavourite(req, res, next) {
  const { user_id, movie_id, poster_path, movie_name} = req.body;
  if (!user_id || !movie_id || !poster_path || !movie_name) {
    console.log("missing field: ", {user_id,movie_id, poster_path, movie_name})
    return res.status(400).json({
      error: "Missing required fields",
      received: req.body,
    });
  }
  try {
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

export async function getFavouritesByUsername(req,res,next) {
  try {
    const favourites = await getByUsername(req.params.username);
    res.json(favourites);
  } catch (err) {
    next(err);
  }
}