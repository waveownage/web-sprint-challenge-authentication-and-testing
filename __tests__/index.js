const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Tests", () => {
  it("POST /register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "andre", password: "1234" });
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.username).toBe("andre");
    expect(res.statusCode).toBe(201);
  });

  it("POST /login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "andre", password: "1234" });
    expect(res.body.message).toBe("Welcome andre!");
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  it("GET /jokes", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
});
