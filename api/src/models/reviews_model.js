import pool from "../database.js";

export async function getAll(id) {
  const result = await pool.query("SELECT * FROM Reviews WHERE movie_id=$1;", [id]);
  return result.rows;
}

export async function addOne(review) {
  const date = new Date();
  const result = await pool.query(
    "INSERT INTO Reviews (review_rating, user_id, review_description, review_date, movie_id) VALUES($1,$2,$3,$4,$5)",
    [review.review_rating, review.user_id, review.review_description, date ,review.movie_id]
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
