import app from "../../app";
import supertest from "supertest";

const request = supertest(app);

test("Get root greeting", async (done) => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Hello!");
  done();
});
