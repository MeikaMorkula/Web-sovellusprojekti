import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import pool from "../src/database.js";

const apiUrl = "http://localhost:3001";

describe("Review router selaus testit", () => {
  test("0) GET /getReviews Palauttaa listan + 200", async () => {
    const res = await request(apiUrl).get("/review/getReviews").expect(200);

    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");
  });

  test("1), GET /getReviews/:id Palauttaa listan +200", async () => {
    const res = await request(apiUrl)
      .get("/review/getReviews/293660")
      .expect(200);

    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body[0].movie_name).toBe('Deadpool');
  });

});
