import express, { NextFunction, Request, Response } from "express";
import { validatePostParams } from "./validation";

// Routes for "/v1/short-urls"
const shortUrlsRouter = express.Router();

shortUrlsRouter.get("/:key", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Getti success" });
});

shortUrlsRouter.post("/", validatePostParams, (req: Request, res: Response) => {
  return res.status(200).json({ message: "Posti success" });
});

export default shortUrlsRouter;
