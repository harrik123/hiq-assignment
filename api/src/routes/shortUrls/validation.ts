import { Request, Response, NextFunction } from "express";

export function validatePostParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { url } = req.body;
  if (url == null || url.trim() === "") {
    return res
      .status(400)
      .json({ error: "Invalid or missing parameters: url" });
  }
  next();
}
