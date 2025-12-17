import pool from "../database.js";

export async function getAll() {
  const result = await pool.query(`SELECT g.*, u.username AS owner_username
            FROM "Group" g JOIN "User" u ON g.group_owner = u.user_id;`);
  return result.rows;
}

export async function getOne(id) {
  const result = await pool.query('SELECT * FROM "Group" WHERE group_id = $1', [
    id,
  ]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOne(group) {
  const group_icon = group.group_icon || null;
  const group_favourite_movie = group.group_favourite_movie || null;

  const result = await pool.query(
    'INSERT INTO "Group" (group_name, group_owner, group_icon, group_description, group_favourite_movie) VALUES($1, $2, $3, $4, $5) RETURNING *;',
    [
      group.group_name,
      group.group_owner,
      group_icon,
      group.group_description,
      group_favourite_movie,
    ]
  );
  return result.rows[0];
}

export async function updateOne(id, group) {
  console.log("update:" + id);
  const result = await pool.query(
    `UPDATE "Group"
    SET group_name = $1, group_owner = $2, group_icon = $3, group_description = $4, group_favourite_movie = $5
    WHERE group_id = $6;`,
    [
      group.group_name,
      group.group_owner,
      group.group_icon,
      group.group_description,
      group.group_favourite_movie,
      id,
    ]
  );
  return result.rows;
}

export async function deleteOne(id) {
  console.log("delete:" + id);
  const result = await pool.query(
    'DELETE FROM "Group" WHERE group_id = $1 RETURNING *;',
    [id]
  );
  return result.rows;
}

export async function getGroupIcon(id) {
  const result = await pool.query(
    `SELECT group_icon FROM "Group" WHERE group_id = $1;`,
    [id]
  );
  return result.rows[0];
}

export async function addGroupPicture(iconpath, id) {
  const result = await pool.query(
    `UPDATE "Group" SET group_icon = $1 WHERE group_id = $2;`,
    [iconpath, id]
  );
  return result;
}

export async function addGroupFavouriteMovie(movie_id, id) {
  const result = await pool.query(
    `UPDATE "Group" SET group_favourite_movie = $1 WHERE group_id = $2;`,
    [movie_id, id]
  );
  return result;
}

export async function addToGroup(body) {
    const result = await pool.query(
      'INSERT INTO User_Groups (user_id, group_id) VALUES($1, $2) RETURNING *;',
    [body.user_id, body.group_id]
  );
  return result;
}

export async function requestToGroupJoin(body) {
    const result = await pool.query(
      'INSERT INTO Group_Request (user_id, group_id) VALUES($1, $2) RETURNING *;',
    [body.user_id, body.group_id]
  );
  return result;
}

export async function getGroupsByUserId(userId) {
  const result = await pool.query(
    `SELECT g.*
     FROM "Group" g
     JOIN User_Groups ug ON ug.group_id = g.group_id
     WHERE ug.user_id = $1`,
    [userId]
  );
  return result.rows;
}
