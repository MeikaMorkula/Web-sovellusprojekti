import {
  getAll,
  getOne,
  addOne,
  deleteOne,
  addGroupPicture,
  addGroupFavouriteMovie,
  getGroupIcon,
  requestToGroupJoin,
  addToGroup,
  getGroupRequests,
  deleteGroupRequest,
} from "../models/group_model.js";

import { upload } from "../middleware/upload.js";

export async function getGroups(req, res, next) {
  try {
    const response = await getAll(req.params.id);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function getGroup(req, res, next) {
  try {
    const group = await getOne(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json(group);
  } catch (err) {
    next(err);
  }
}

export async function addGroup(req, res, next) {
  try {
    const response = await addOne(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteGroup(req, res, next) {
  try {
    const group = await deleteOne(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json(group);
  } catch (err) {
    next(err);
  }
}

export async function uploadGroupPicture(req, res, next) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const iconpath = req.file.filename;
      const result = await addGroupPicture(iconpath, req.params.id);

      res.json({
        message: "File upload successfull",
        file: req.file,
      });
    } catch (err) {
      next(err);
    }
  });
}

export async function fetchGroupIcon(req, res, next) {
  try {
    const user = await getGroupIcon(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "group not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function uploadGroupFavouriteMovie(req, res, next) {
  try {
    const response = await addGroupFavouriteMovie(
      req.body.movie_id,
      req.params.id
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function requestGroupJoin(req, res, next) {
  try {
    const response = await requestToGroupJoin(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  } 
}

export async function addUserToGroup(req, res, next) {
  try {
    const response = await addToGroup(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  } 
}

import { getGroupsByUserId } from "../models/group_model.js";

export async function getUserGroups(req, res, next) {
  try {
    const groups = await getGroupsByUserId(req.params.id);
    res.json(groups);
  } catch (err) {
    next(err);
  }
}
export async function fetchGroupRequests(req, res, next) {
  try {
    const response = await getGroupRequests(req.params.id);
    res.json(response);
  } catch (err) {
    next(err);
  } 
}

export async function removeGroupRequest(req, res, next) {
  try {
    const response = await deleteGroupRequest(req.params.id);
    res.json(response);
  } catch (err) {
    next(err);
  } 
}
