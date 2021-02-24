import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";

const port = process.env.PORT || "4000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));
