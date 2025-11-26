import pool from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM Favourites");
  return result.rows; 
}

export async function getOne(id) {
  const result = await pool.query("SELECT * FROM Favourites WHERE Movie_ID = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOne(book) {
  const result = await pool.query("INSERT INTO Favourites (user_id, movie_ID, username) VALUES($1,$2,$3)", [favourite.user_id, favourite.movie_id,favourite.username]);
  return result.rows;
}

export async function deleteOne(id) {
  console.log("delete:"+id);
  const result = await pool.query("DELETE FROM Favourites WHERE favourite_id = $1", [id]);
  return result.rows;
}
