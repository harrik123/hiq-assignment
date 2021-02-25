import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";

const PORT = process.env.PORT || "4000";
app.set("port", PORT);

export const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Create HTTP server.
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
