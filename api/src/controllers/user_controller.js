import bcrypt from "bcrypt"

import {
  updateUserPassword,
  getAllUsers,
  getOneUser,
  addOneUser,
  updateOneUser,
  deleteOneUser,
  addUserProfilePicture,
  getUserProfilePicture,
} from "../models/user_model.js";

import { upload } from "../middleware/upload.js";

export async function updatePassword(req, res, next) {
  try {
    const userId = Number(req.params.id);
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "You cannot change someone else's password" });
    }
    const { oldPassword, newPassword } = req.body;
    const user = await getOneUser(userId);
    const matches = await bcrypt.compare(oldPassword, user.password);
    if (!matches) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }
    await updateUserPassword(userId, newPassword);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
}

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
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserPfp(req, res, next) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const pfpPath = req.file.filename;
      const result = await addUserProfilePicture(req.params.id, pfpPath);

      res.json({
        message: "File upload successfull",
        file: req.file,
      });
    } catch (err) {
      next(err);
    }
  });
}

export async function getUserPfp(req, res, next) {
  try {
    const user = await getUserProfilePicture(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}
