import fsPromises from "fs/promises";
import { STORAGE_PATH } from "../app";
import { IShortUrlItem } from "../ts/interfaces";
import { getStoredItems, isShortUrlStillValid } from "./functions";

test("Get stored items and file existst", async (done) => {
  const dataFromStorage: IShortUrlItem[] = [
    {
      key: "123",
      url: "https://asd.com",
      created: new Date().toISOString(),
    },
  ];

  const mockReadFile = jest
    .fn()
    .mockResolvedValue(JSON.stringify(dataFromStorage));

  fsPromises.readFile = mockReadFile;

  const result = await getStoredItems();

  expect(result).toMatchObject(dataFromStorage);
  expect(mockReadFile).toHaveBeenCalledWith(STORAGE_PATH, "utf8");

  done();
});

test("Get stored items and file doesn't exist", async (done) => {
  const mockReadFile = jest.fn().mockImplementation(() => {
    throw { code: "ENOENT" };
  });

  fsPromises.readFile = mockReadFile;

  const result = await getStoredItems();

  expect(result).toHaveLength(0);

  done();
});

test("Url created over a week ago", () => {
  testUrlIsValid(8, false);
});

test("Url created less than a week ago", () => {
  testUrlIsValid(6, true);
});

function testUrlIsValid(days: number, expected: boolean) {
  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - days);

  const item: IShortUrlItem = {
    key: "asd",
    url: "asd.com",
    created: createdDate.toISOString(),
  };

  expect(isShortUrlStillValid(item)).toBe(expected);
}
