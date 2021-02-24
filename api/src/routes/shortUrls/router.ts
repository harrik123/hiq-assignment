import express, { NextFunction, Request, Response } from "express";

// Routes for "/v1/short-urls"
const shortUrlsRouter = express.Router();

shortUrlsRouter.get(
  "/:key",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Getti success" });
  }
);

shortUrlsRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Posti success" });
});

export default shortUrlsRouter;
