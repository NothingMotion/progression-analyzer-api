"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountRouter_1 = require("./routers/accountRouter");
const accessTokenRouter_1 = require("./routers/accessTokenRouter");
const dbConnector_1 = __importDefault(require("./utils/dbConnector"));
const jwtAuthMiddleware_1 = __importDefault(require("./middlewares/jwtAuthMiddleware"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const masteryRouter_1 = require("./routers/masteryRouter");
const starrDropRouter_1 = require("./routers/starrDropRouter");
const passRouter_1 = require("./routers/passRouter");
const trophyRoadRouter_1 = require("./routers/trophyRoadRouter");
const constants_1 = require("./constants/constants");
const app = (0, express_1.default)();
(0, dbConnector_1.default)();
//rate limit
app.use((0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    limit: parseInt(process.env.MAX_REQUEST_PER_MINUTE || "100"),
}));
app.use(express_1.default.json());
app.use("/api/v1/token", accessTokenRouter_1.accessTokenRouter);
app.use("/api/v1/accounts", jwtAuthMiddleware_1.default, accountRouter_1.router);
app.use("/api/v1/rewards/pass", jwtAuthMiddleware_1.default, passRouter_1.passRouter);
app.use("/api/v1/rewards/starrdrop", jwtAuthMiddleware_1.default, starrDropRouter_1.starrDropRouter);
app.use("/api/v1/rewards/trohpy-road", jwtAuthMiddleware_1.default, trophyRoadRouter_1.trophyRoadRouter);
app.use("/api/v1/rewards/mastery", jwtAuthMiddleware_1.default, masteryRouter_1.masteryRouter);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});
app.listen(constants_1.PORT, () => {
    console.log(`Server is running on port ${constants_1.PORT}`);
});
