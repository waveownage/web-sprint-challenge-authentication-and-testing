const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Register and Login Tests", () => {

    it("POST /register", async () => {
        const res = await supertest(server)
        .post("/register") 
        .send({ username: "bilbo"})
        expect(res.statusCode).toBe(201)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe("bilbo")

    })
})