import express, { Request, Response, NextFunction } from "express";
import fsPromises from "fs/promises";
import { nanoid } from "nanoid";
import { API_URL, KEY_MAX_LENGTH, STORAGE_PATH } from "../../app";
import { IShortUrlItem } from "../../ts/interfaces";
import { getStoredItems, isShortUrlStillValid } from "../../utils/functions";
import { validatePostParams } from "./validation";

export const V1_SHORT_URLS = "/v1/short-urls";
const shortUrlsRouter = express.Router();

shortUrlsRouter.get(
  "/:key",
  async (req: Request, res: Response, next: NextFunction) => {
    let storedItems: IShortUrlItem[];
    try {
      storedItems = await getStoredItems();
    } catch (err) {
      return next(err);
    }

    const storedItem = storedItems.find((item) => item.key === req.params.key);

    if (!storedItem) {
      return res.status(200).json({ message: "Shortened url not found." });
    }

    if (!isShortUrlStillValid(storedItem)) {
      return res.status(200).json({ message: "Shortened url is expired." });
    }

    return res.status(200).json({
      data: {
        originalUrl: storedItem.url,
      },
    });
  }
);

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
      return res.status(200).json({
        data: {
          shortUrl: `${API_URL}${V1_SHORT_URLS}/${newItem.key}`,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

export default shortUrlsRouter;
