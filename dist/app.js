"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./utils/logger");
// Import routes
const accountRoutes_1 = require("./routes/accountRoutes");
const dropChancesRoutes_1 = require("./routes/dropChancesRoutes");
const logger = (0, logger_1.createLogger)("App");
const createApp = () => {
    const app = (0, express_1.default)();
    // Security middlewares
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    // Body parsing middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Performance middleware
    app.use((0, compression_1.default)());
    // Request logging
    if (config_1.default.nodeEnv === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    else {
        app.use((0, morgan_1.default)("combined"));
    }
    // Health check endpoint
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "UP", environment: config_1.default.nodeEnv });
    });
    // API routes
    app.use("/api/v1/accounts", accountRoutes_1.router);
    app.use("/api/v1/drop-chances", dropChancesRoutes_1.router);
    // Error handling middlewares
    app.use(errorHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
exports.default = exports.createApp;
