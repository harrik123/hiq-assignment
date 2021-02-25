import express, { Request, Response, NextFunction } from "express";
import fsPromises from "fs/promises";
import { nanoid } from "nanoid";
import { KEY_MAX_LENGTH, STORAGE_PATH } from "../../app";
import { IShortUrlItem } from "../../ts/interfaces";
import { validatePostParams } from "./validation";

// Routes for "/v1/short-urls"
const shortUrlsRouter = express.Router();

shortUrlsRouter.get("/:key", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Getti success" });
});

/**
 * Create new shortened url
 *
 */
shortUrlsRouter.post(
  "/",
  validatePostParams,
  async (req: Request, res: Response, next: NextFunction) => {
    let storedItems: IShortUrlItem[];
    try {
      storedItems = await getStoredItems();
    } catch (err) {
      return next(err);
    }

    const newItem: IShortUrlItem = {
      key: nanoid(KEY_MAX_LENGTH),
      url: req.body.url,
      created: new Date().toISOString(),
    };

    storedItems.push(newItem);

    try {
      await fsPromises.writeFile(STORAGE_PATH, JSON.stringify(storedItems));
      return res.status(200).json({ data: newItem });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

async function getStoredItems() {
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

export default shortUrlsRouter;
