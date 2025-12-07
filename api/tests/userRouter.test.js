import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import pool from "../src/database.js";
import { generateAccessToken } from "../src/utils/jwt.js";

//jest ei tykkää jos route menee App kautta, kovakoodataan tämä
const apiUrl = "http://localhost:3001";

let newUser = {};
let newUserToken = "";

afterAll(async () => {
  await pool.end();
});

describe("User router tests", () => {
  describe("Registration tests + delete", () => {
    test("0), POST /register tulisi luoda uusi käyttäjä ja palauttaa 201", async () => {
      const testUser = {
        //Date.now uniikkia  käyttäjäniemä varten
        username: `testuser${Date.now()}`,
        password: "testpaass123",
        refresh_token: "",
        profile_picture: "profile_pic.png",
        profile_description: "This is a test user",
        favourite_movie: 1,
      };
      const res = await request(apiUrl)
        .post("/register")
        .send(testUser)
        .expect(201);

      //tallennetaan luodun käyttäjän tiedot poistoa varten
      newUser = res.body;
      newUserToken = generateAccessToken(newUser.id);

      expect(res.body.username).toBe(testUser.username);
    });

    test("1)DELETE /user/:id tulisi poistaa luotu käyttäjä", async () => {
      const fetchuserId = await request(apiUrl)
        .get("/user/me")
        .set("Cookie", `accessToken=${newUserToken}`)
        .expect(200);

      const userId = fetchuserId.body.id;

      const res = await request(apiUrl)
        .delete(`/user/${userId}`)
        .set("Cookie", `accessToken=${newUserToken}`)
        .expect(200);

      expect(res.status).toBe(200);

      //varmistetaan että käyttäjää ei enää löydy
      const res2 = await request(apiUrl)
        .get(`/user/${userId}`)
        .set("Cookie", `accessToken=${newUserToken}`)
        .expect(404);

      expect(res2.body.error).toBe("User not found");
    });
  });

  test("2) GET /:id palauttaa listan (200 + object)", async () => {
    const token = generateAccessToken(1);
    const res = await request(apiUrl)
      .get("/user/1")
      .set("Cookie", `accessToken=${token}`)
      .expect(200);

    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");
  });

  test("3) GET /:id ilman tokenia palauttaa 401 Unauthorized", async () => {
    const token = "";
    const res = await request(apiUrl)
      .get("/user/1")
      .set("Cookie", `accessToken=${token}`)
      .expect(401);

    expect(res.status).toBe(401);
  });

  test("5) GET /:toisen käyttäjän id palauttaa 403 forbidden", async () => {
    const token = generateAccessToken(1);
    const res = await request(apiUrl)
      .get("/user/2")
      .set("Cookie", `accessToken=${token}`)
      .expect(403);

    expect(res.status).toBe(403);
  });

  test("6) GET /:null tulisi palauttaa 404 not found", async () => {
    const token = generateAccessToken(1);
    const res = await request(apiUrl)
      .get("/user/")
      .set("Cookie", `accessToken=${token}`)
      .expect(404);

    expect(res.status).toBe(404);
  });

  test("7) GET /:id väärällä tokenilla palauttaa 403 forbidden", async () => {
    const token = generateAccessToken(9)
    const res = await request(apiUrl)
      .get("/user/1")
      .set("Cookie", `accessToken=${token}`)
      .expect(403);

    expect(res.status).toBe(403);
  });

});
