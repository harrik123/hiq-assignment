import app from "../../app";
import supertest from "supertest";
import * as utils from "../../utils/functions";
import { IShortUrlItem } from "../../ts/interfaces";

const request = supertest(app);
const mockItems: IShortUrlItem[] = [
  {
    key: "123",
    url: "https://asd.com",
    created: new Date().toISOString(),
  },
];

test("GET original url success", async (done) => {
  jest
    .spyOn(utils, "getStoredItems")
    .mockReturnValueOnce(Promise.resolve(mockItems));

  const res = await request.get("/v1/short-urls/123");
  expect(res.status).toBe(200);
  expect(res.body.data.originalUrl).toBe("https://asd.com");
  done();
});

test("GET original url not found", async (done) => {
  jest
    .spyOn(utils, "getStoredItems")
    .mockReturnValueOnce(Promise.resolve(mockItems));

  const res = await request.get("/v1/short-urls/123456");
  expect(res.status).toBe(200);
  expect(res.body.data).toBe(undefined);
  expect(res.body.message).toBe("Shortened url not found.");
  done();
});

test("GET original url expired", async (done) => {
  const createdOverWeekAgo = new Date();
  createdOverWeekAgo.setDate(createdOverWeekAgo.getDate() - 8);
  const expiredItem: IShortUrlItem[] = [
    {
      key: "123",
      url: "https://asd.com",
      created: createdOverWeekAgo.toISOString(),
    },
  ];

  jest
    .spyOn(utils, "getStoredItems")
    .mockReturnValueOnce(Promise.resolve(expiredItem));

  const res = await request.get("/v1/short-urls/123");
  expect(res.status).toBe(200);
  expect(res.body.data).toBe(undefined);
  expect(res.body.message).toBe("Shortened url is expired.");
  done();
});
