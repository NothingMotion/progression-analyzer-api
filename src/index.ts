import { configDotenv } from "dotenv";
import Logger from "./lib/Logger";
import path from "path";
configDotenv({ path: path.join(__dirname, "../.env.local") });
import express from "express";
import cors from "cors";
import { router as accountRouter } from "./routers/accountRouter";
import { accessTokenRouter } from "./routers/accessTokenRouter";
import dbConnector from "./utils/dbConnector";
import authMiddleware from "./middlewares/jwtAuthMiddleware";
import rateLimit from "express-rate-limit";
import { masteryRouter } from "./routers/masteryRouter";
import { starrDropRouter } from "./routers/starrDropRouter";
import { passRouter } from "./routers/passRouter";
import { trophyRoadRouter } from "./routers/trophyRoadRouter";
import { rarityTableRouter } from "./routers/brawlerRarityTableRouter";
import { upgradeTableRouter } from "./routers/upgradeTableRouter";
import { notmotRouter } from "./routers/notmotRouter";
import { PORT } from "./constants/constants";
const app = express();

dbConnector();

// Enable CORS for all routes
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "application-request-sender",
    ],
    credentials: true,
  }),
);

//rate limit
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: parseInt(process.env.MAX_REQUEST_PER_MINUTE || "100"),
  }),
);

app.use(express.json());
app.use("/api/v1/token", accessTokenRouter);
app.use("/api/v1/accounts", authMiddleware, accountRouter);
app.use("/api/v1/rewards/pass", authMiddleware, passRouter);
app.use("/api/v1/rewards/starrdrop", authMiddleware, starrDropRouter);
app.use("/api/v1/rewards/trophy-road", authMiddleware, trophyRoadRouter);
app.use("/api/v1/rewards/mastery", authMiddleware, masteryRouter);
app.use("/api/v1/table/brawler/rarity", authMiddleware, rarityTableRouter);
app.use("/api/v1/table/brawler/upgrade", authMiddleware, upgradeTableRouter);
app.use("/api/v1/notmot", authMiddleware, notmotRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});
app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  Logger.log("SIGINT signal received. Shutting down gracefully...");
  process.exit(0);
});
process.on("SIGTERM", () => {
  Logger.log("SIGTERM signal received. Shutting down gracefully...");
  process.exit(0);
});
