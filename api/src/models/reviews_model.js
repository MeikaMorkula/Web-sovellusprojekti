import pool from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM Reviews;");
  return result.rows;
}

export async function getAllFromId(id) {
  const result = await pool.query("SELECT * FROM Reviews WHERE movie_id = $1;", 
    [id]
  );
  return result.rows;
}
export async function addOne(review) {
  const date = new Date();
  const result = await pool.query(
    "INSERT INTO Reviews (review_rating, username, user_id, review_description, review_date, movie_id, poster_path, movie_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [review.review_rating, review.username, review.user_id, review.review_description, date ,review.movie_id, review.poster_path, review.movie_name]
  );
  return result.rows;
}

export async function deleteOne(id) {
  console.log("delete:" + id);
  const result = await pool.query(
    "DELETE FROM Reviews WHERE review_id = $1",
    [id]
  );
  return result.rows;
}
