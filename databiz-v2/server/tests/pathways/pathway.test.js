const request = require("supertest");
const app = require("../../src/app");
const setupDB = require("../setup");
const Pathway = require("../../src/models/Pathway");

beforeAll(async () => await setupDB.connect());
afterAll(async () => await setupDB.closeDatabase());
afterEach(async () => await setupDB.clearDatabase());

describe("Pathway API", () => {
  it("creates a pathway", async () => {
    const res = await request(app)
      .post("/pathways")
      .send({
        title: "DS Path",
        description: "Learn DS",
        category: "DS",
        resources: [],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("DS Path");
  });

  it("fetches all pathways", async () => {
    await Pathway.create({
      title: "DS",
      description: "desc",
      category: "DS",
      resources: [],
    });
    await Pathway.create({
      title: "ML",
      description: "desc",
      category: "ML",
      resources: [],
    });

    const res = await request(app).get("/pathways");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
