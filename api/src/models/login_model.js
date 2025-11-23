import pool from "../database.js";
import bcrypt from "bcrypt"

export async function authenticateUser(username, password) {

  const result = await pool.query(
    `SELECT user_id,password FROM "User" WHERE username = $1;`,[username]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);

  //console.log("COMPARE:", password, "|", user.password);
  if (isValid) {
    return { id: user.user_id };
  }

  return null;
}

export async function saveRefreshToken(id, refreshToken) {
  const result = await pool.query(
    `UPDATE "User" SET refresh_token = $1 WHERE user_id = $2 RETURNING user_id`,
    [refreshToken, id]
  );
  return result.rows[0];
}

export async function getUserByRefreshToken(refreshToken) {
  const result = await pool.query(
    `SELECT user_id FROM "User" WHERE refresh_token = $1`,
    [refreshToken]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function clearRefreshToken(id) {
  const result = await pool.query(
    `UPDATE "User" SET refresh_token = NULL WHERE user_id = $1 RETURNING username`,
    [id]
  );
  return result.rows[0];
}
