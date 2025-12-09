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
  const existing = await getOneUser(id);
  if (!existing) return null;


  const updated = {
    username: user.username ?? existing.username,
    refresh_token: user.refresh_token ?? existing.refresh_token,
    profile_picture: user.profile_picture ?? existing.profile_picture,
    profile_description: user.profile_description ?? existing.profile_description,
    favourite_movie: user.favourite_movie ?? existing.favourite_movie,
  };

  const result = await pool.query(
    `UPDATE "User"
      SET username = $1,
      refresh_token = $2,
      profile_picture = $3,
      profile_description = $4,
      favourite_movie = $5
      WHERE user_id = $6
      RETURNING *`,
    [
      updated.username,
      updated.refresh_token,
      updated.profile_picture,
      updated.profile_description,
      updated.favourite_movie,
      id,
    ]
  );

  return result.rows[0];
}
export async function deleteOneUser(id) {

  //poistetaan käyttäjän omistamat ryhmät kun käyttäjä poistetaan
  await pool.query(`DELETE FROM "Group" WHERE group_owner = $1;`, 
      [id]
    );

  const result = await pool.query(`DELETE FROM "User" WHERE user_id = $1 RETURNING *;`, [
    id,
  ]);
  return result.rows[0];
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

export async function updateUserPassword(id, newPassword) {
  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  return pool.query(
    `UPDATE "User" SET password = $1 WHERE user_id = $2`,
    [hashed, id]
  );
}