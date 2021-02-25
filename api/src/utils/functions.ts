import { IShortUrlItem } from "../ts/interfaces";
import fsPromises from "fs/promises";
import { STORAGE_PATH } from "../app";

/**
 * Return stored items in STORAGE_PATH json file
 *
 */
export async function getStoredItems() {
  let storedItems: IShortUrlItem[];
  try {
    const dataFromStorage: string = await fsPromises.readFile(
      STORAGE_PATH,
      "utf8"
    );
    storedItems = JSON.parse(dataFromStorage);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist yet
      storedItems = [];
    } else {
      throw new Error("Something went wrong.");
    }
  }

  return storedItems;
}

/**
 * Check that shortened url is not older than 7 days
 *
 */
export function isShortUrlStillValid(item: IShortUrlItem) {
  const createdWeekAgo = new Date();
  createdWeekAgo.setDate(createdWeekAgo.getDate() - 7);

  return new Date(item.created) > createdWeekAgo;
}
