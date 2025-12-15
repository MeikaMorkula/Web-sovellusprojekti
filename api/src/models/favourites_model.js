import pool from "../database.js";

export async function getAll(id) {
  const result = await pool.query(
    "SELECT * FROM Favourites WHERE user_id = $1;",
    [id]
  );
  return result.rows;
}

export async function getOne(favourite) {
  const result = await pool.query(
    `SELECT * FROM Favourites WHERE (movie_id = $1 AND user_id = $2);`,
    [favourite.movie_id, favourite.user_id]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOne(favourite) {
  const result = await pool.query(
    "INSERT INTO Favourites (user_id, movie_id) VALUES($1,$2);",
    [favourite.user_id, favourite.movie_id]
  );
  return result.rows;
}

export async function deleteOne(id) {
  console.log("delete:" + id);
  const result = await pool.query(
    "DELETE FROM Favourites WHERE favourite_id = $1;",
    [id]
  );
  return result.rows;
}

export async function getByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM Favourites WHERE username = $1;",[username]
  );
  return result.rows;
}