const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../src/app");
const setupDB = require("../setup");
const User = require("../../src/models/User");

beforeAll(async () => await setupDB.connect());
afterEach(async () => await setupDB.clearDatabase());
afterAll(async () => await setupDB.closeDatabase());

describe("Auth API", () => {
  it("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Alice",
      email: "alice@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.name).toBe("Alice");
    expect(res.body.user.email).toBe("alice@test.com");

    // Ensure password is hashed
    const userInDB = await User.findOne({ email: "alice@test.com" });
    expect(userInDB.passwordHash).toBeDefined();
    expect(userInDB.passwordHash).not.toBe("123456");
  });

  it("logs in a user using hashed password", async () => {
    // Option 1: Create user manually with hashed password
    const passwordHash = await bcrypt.hash("123456", 10);
    await User.create({
      name: "Bob",
      email: "bob@test.com",
      passwordHash,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "bob@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("logs in a user using register endpoint first", async () => {
    // Option 2: Register user then login
    await request(app).post("/api/auth/register").send({
      name: "Charlie",
      email: "charlie@test.com",
      password: "123456",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "charlie@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("fails login with wrong password", async () => {
    const passwordHash = await bcrypt.hash("123456", 10);
    await User.create({ name: "Dave", email: "dave@test.com", passwordHash });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "dave@test.com", password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it("fails login with non-existent email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "notfound@test.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });
});
