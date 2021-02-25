import app, { API_URL, STORAGE_PATH } from "../../app";
import supertest from "supertest";
import * as utils from "../../utils/functions";
import { IShortUrlItem } from "../../ts/interfaces";
import fsPromises from "fs/promises";
import nanoid from "nanoid";
import { V1_SHORT_URLS } from "./router";

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

test("POST create short url success", async (done) => {
  const storedItems: IShortUrlItem[] = [];
  jest
    .spyOn(utils, "getStoredItems")
    .mockReturnValueOnce(Promise.resolve(storedItems));

  const newItemKey = "123";
  const mockNanoid = jest.fn().mockReturnValue(newItemKey);
  nanoid.nanoid = mockNanoid;

  const mockWriteFile = jest.fn();
  fsPromises.writeFile = mockWriteFile;

  const res = await request
    .post("/v1/short-urls")
    .send({ url: "https://created.com" });

  expect(mockWriteFile).toHaveBeenCalledWith(
    STORAGE_PATH,
    JSON.stringify(storedItems)
  );
  expect(res.status).toBe(200);
  expect(res.body.data.shortUrl).toBe(
    `${API_URL}${V1_SHORT_URLS}/${newItemKey}`
  );
  expect(storedItems[0].key).toBe(newItemKey);
  done();
});
