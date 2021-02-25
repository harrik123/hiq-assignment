import app from "../../app";
import supertest from "supertest";
import { isShortUrlStillValid } from "./router";
import { IShortUrlItem } from "../../ts/interfaces";

const request = supertest(app);

test("Url created over a week ago", () => {
  testUrlIsValid(8, false);
});

test("Url created less than a week ago", () => {
  testUrlIsValid(6, true);
});

function testUrlIsValid(days: number, expected: boolean) {
  const createdOverWeekAgo = new Date();
  createdOverWeekAgo.setDate(createdOverWeekAgo.getDate() - days);

  const item: IShortUrlItem = {
    key: "asd",
    url: "asd.com",
    created: createdOverWeekAgo.toISOString(),
  };

  expect(isShortUrlStillValid(item)).toBe(expected);
}
