import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

// 404 route for all
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// JSON error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: { message: err.message } });
});

export default app;
