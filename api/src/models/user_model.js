import pool from "../database.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function getAllUsers() {
  const result = await pool.query(`SELECT * FROM "User";`);
  return result.rows;
}

export async function getOneUser(id) {
  const result = await pool.query(`SELECT * FROM "User" WHERE user_id = $1;`, [
    id,
  ]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOneUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const result = await pool.query(
    `INSERT INTO "User" (username, password, refresh_token, profile_picture, profile_description, favourite_movie)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      user.username,
      hashedPassword,
      user.refresh_token,
      user.profile_picture,
      user.profile_description,
      user.favourite_movie,
    ]
  );
  return result.rows[0];
}

export async function updateOneUser(id, user) {
  console.log("update:" + id);

  //tämä on vaan testiä, ei oikeasti kannatta vaihtaa salasanaa esim lempielokuvan päivityksessä

  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const result = await pool.query(
    `UPDATE "User"
    SET username = $1, password = $2, refresh_token = $3, profile_picture = $4, profile_description = $5, favourite_movie = $6
    WHERE user_id = $7;`,
    [
      user.username,
      hashedPassword,
      user.refresh_token,
      user.profile_picture,
      user.profile_description,
      user.favourite_movie,
      id,
    ]
  );
  return result.rows;
}

export async function deleteOneUser(id) {
  const result = await pool.query(`DELETE FROM "User" WHERE user_id = $1;`, [
    id,
  ]);
  return result.rows;
}

export async function addUserProfilePicture(id, pfpPath) {
  const result = await pool.query(
    `UPDATE "User" SET profile_picture = $1 WHERE user_id = $2 ;`,
    [pfpPath, id]
  );
  return result;
}

export async function getUserProfilePicture(id) {
  const result = await pool.query(
    `SELECT profile_picture FROM "User" WHERE user_id = $1 ;`,
    [id]
  );
  return result.rows[0];
}
