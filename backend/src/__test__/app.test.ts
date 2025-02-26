import app from "../server";
import request from "supertest";
describe("Get /", () => {
  it("Should return some text to show teh server is running", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server is Running!");
  });
});
