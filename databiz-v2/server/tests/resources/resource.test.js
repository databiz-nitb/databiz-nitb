const request = require("supertest");
const app = require("../../src/app");
const setupDB = require("../setup");
const Resource = require("../../src/models/Resource");

beforeAll(async () => await setupDB.connect());
afterAll(async () => await setupDB.closeDatabase());
afterEach(async () => await setupDB.clearDatabase());

describe("Resource API", () => {
  it("creates a resource", async () => {
    const res = await request(app)
      .post("/resources")
      .send({
        title: "Python Basics",
        url: "http://example.com",
        type: "video",
        tags: ["python"],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Python Basics");
  });

  it("fetches all resources", async () => {
    await Resource.create({
      title: "Python",
      url: "url",
      type: "video",
      tags: ["python"],
    });
    await Resource.create({
      title: "JS",
      url: "url",
      type: "video",
      tags: ["javascript"],
    });

    const res = await request(app).get("/resources");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
