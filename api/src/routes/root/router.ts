import express, { NextFunction, Request, Response } from "express";

// Routes for "/"
const rootRouter = express.Router();

rootRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello!" });
});

export default rootRouter;
