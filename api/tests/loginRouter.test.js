import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import pool from "../src/database.js";

const apiUrl = "http://localhost:3001";

afterAll(async () => {
  await pool.end();
});

describe("Login Router testit", () => {
  test("0) POST /login tulisi palauttaa 200", async () => {
    const testUser = {
      username: "testuser1",
      password: "testpwd1",
    };

    const res = await request(apiUrl).post("/login").send(testUser).expect(200);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  test("1) POST /logout tulisi palauttaa 200", async () =>
{
    const res = await request(apiUrl).post("/logout").expect(200);
     expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logout successful");
})

test("2) POST /Login väärällä tunnuksella tulisi palauttaa 401", async ()=>
{
    const falseTestUser = {
      username: "testuser1",
      password: "testpwd3",
    };

    const res = await request(apiUrl).post("/login").send(falseTestUser).expect(401);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid username or password");
})

test("3) POST /Login puuttuvilla tiedoilla tulisi palauttaa 400 ", async ()=>
{
    const missingInfo = {
        username: "testuser1",
        password:""
    }

    const res = await request(apiUrl).post("/login").send(missingInfo).expect(400);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Username and password are required");
})
});
