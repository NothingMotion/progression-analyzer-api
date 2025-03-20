"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const app_1 = require("./app");
const connection_1 = require("./db/connection");
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./utils/logger");
const logger = (0, logger_1.createLogger)("Server");
// Start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to database
        yield (0, connection_1.connectDB)();
        // Create Express app
        const app = (0, app_1.createApp)();
        // Start listening
        const server = app.listen(config_1.default.port, () => {
            logger.info(`Server running in ${config_1.default.nodeEnv} mode on port ${config_1.default.port}`);
        });
        // Handle unhandled rejections
        process.on("unhandledRejection", (err) => {
            logger.error("UNHANDLED REJECTION! Shutting down...", err);
            // Gracefully close server & exit
            server.close(() => {
                process.exit(1);
            });
        });
        // Handle uncaught exceptions
        process.on("uncaughtException", (err) => {
            logger.error("UNCAUGHT EXCEPTION! Shutting down...", err);
            process.exit(1);
        });
        // Handle SIGTERM
        process.on("SIGTERM", () => {
            logger.info("SIGTERM received. Shutting down gracefully");
            server.close(() => {
                logger.info("Process terminated");
            });
        });
        return server;
    }
    catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
});
exports.startServer = startServer;
// Start the server if this file is run directly
if (require.main === module) {
    startServer();
}
