import cors from "cors";
import express from "express";
import { CORS_ORIGIN } from "./config.js";
import { initializeDatabase } from "./db/database.js";
import "./db/seed.js";
import { adminRouter } from "./routes/admin.js";
import { aiRouter } from "./routes/ai.js";
import { gameRouter } from "./routes/game.js";
import { healthRouter } from "./routes/health.js";
import { playerRouter } from "./routes/players.js";

initializeDatabase();

export const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "AI Adventure Academy API", version: "1.0.0" });
});

app.use("/api/health", healthRouter);
app.use("/api/game", gameRouter);
app.use("/api/players", playerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/ai", aiRouter);
