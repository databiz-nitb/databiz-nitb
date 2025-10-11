const request = require("supertest");
const app = require("../../src/app");
const setupDB = require("../setup");
const User = require("../../src/models/User");

beforeAll(async () => await setupDB.connect());
afterAll(async () => await setupDB.closeDatabase());
afterEach(async () => await setupDB.clearDatabase());

describe("User API", () => {
  it("creates a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@test.com", password: "123456" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Alice");
  });

  it("gets all users", async () => {
    await User.create({
      name: "Alice",
      email: "alice@test.com",
      password: "123456",
    });
    await User.create({
      name: "Bob",
      email: "bob@test.com",
      password: "123456",
    });

    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
