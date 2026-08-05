import express from "express";
import nunjucks from "nunjucks";
import APIRouter from "./routes/APIRouter";
import { closeDatabase, connectToDatabase } from "./db/database";

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use("/api", APIRouter);

await connectToDatabase();

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await closeDatabase();
  console.log("database connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await closeDatabase();
  console.log("database connection closed");
  process.exit(0);
});
