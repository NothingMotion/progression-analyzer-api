"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Logger_1 = __importDefault(require("./lib/Logger"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)({ path: path_1.default.join(__dirname, "../.env.local") });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const accountRouter_1 = require("./routers/accountRouter");
const accessTokenRouter_1 = require("./routers/accessTokenRouter");
const battleRouter_1 = require("./routers/battleRouter");
const clubRouter_1 = require("./routers/clubRouter");
const dbConnector_1 = __importDefault(require("./utils/dbConnector"));
const jwtAuthMiddleware_1 = __importDefault(require("./middlewares/jwtAuthMiddleware"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const masteryRouter_1 = require("./routers/masteryRouter");
const starrDropRouter_1 = require("./routers/starrDropRouter");
const passRouter_1 = require("./routers/passRouter");
const trophyRoadRouter_1 = require("./routers/trophyRoadRouter");
const brawlerRarityTableRouter_1 = require("./routers/brawlerRarityTableRouter");
const upgradeTableRouter_1 = require("./routers/upgradeTableRouter");
const notmotRouter_1 = require("./routers/notmotRouter");
const constants_1 = require("./constants/constants");
const app = (0, express_1.default)();
(0, dbConnector_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "application-request-sender",
    ],
    credentials: true,
}));
//rate limit
app.use((0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    limit: parseInt(process.env.MAX_REQUEST_PER_MINUTE || "100"),
}));
app.use(express_1.default.json());
app.use("/api/v1/token", accessTokenRouter_1.accessTokenRouter);
app.use("/api/v1/accounts", jwtAuthMiddleware_1.default, accountRouter_1.router);
app.use("/api/v1/battles", jwtAuthMiddleware_1.default, battleRouter_1.battleRouter);
app.use("/api/v1/clubs", jwtAuthMiddleware_1.default, clubRouter_1.clubRouter);
app.use("/api/v1/rewards/pass", jwtAuthMiddleware_1.default, passRouter_1.passRouter);
app.use("/api/v1/rewards/starrdrop", jwtAuthMiddleware_1.default, starrDropRouter_1.starrDropRouter);
app.use("/api/v1/rewards/trophy-road", jwtAuthMiddleware_1.default, trophyRoadRouter_1.trophyRoadRouter);
app.use("/api/v1/rewards/mastery", jwtAuthMiddleware_1.default, masteryRouter_1.masteryRouter);
app.use("/api/v1/table/brawler/rarity", jwtAuthMiddleware_1.default, brawlerRarityTableRouter_1.rarityTableRouter);
app.use("/api/v1/table/brawler/upgrade", jwtAuthMiddleware_1.default, upgradeTableRouter_1.upgradeTableRouter);
app.use("/api/v1/notmot", jwtAuthMiddleware_1.default, notmotRouter_1.notmotRouter);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});
app.listen(constants_1.PORT, () => {
    Logger_1.default.log(`Server is running on port ${constants_1.PORT}`);
});
process.on("SIGINT", () => {
    Logger_1.default.log("SIGINT signal received. Shutting down gracefully...");
    process.exit(0);
});
process.on("SIGTERM", () => {
    Logger_1.default.log("SIGTERM signal received. Shutting down gracefully...");
    process.exit(0);
});
