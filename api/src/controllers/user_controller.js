import {
  getAllUsers,
  getOneUser,
  addOneUser,
  updateOneUser,
  deleteOneUser,
} from "../models/user_model.js";

export async function getUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await getOneUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function addUser(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await addOneUser(req.body);

    res
      .status(201)
      .json({ message: "User created successfully", username: user.username });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Username already exists" });
    }
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const response = await updateOneUser(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await deleteOneUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

