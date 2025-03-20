"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
// Default configuration values
const defaultConfig = {
    nodeEnv: "development",
    port: 3000,
    mongoUri: "mongodb://localhost:27017/brawlstars",
    jwtSecret: "your-secret-key",
    brawlStarsApiKey: "",
    brawlStarsApiUrl: "https://api.brawlstars.com/v1",
    logLevel: "info",
};
// Load from environment variables with validation
const config = {
    nodeEnv: process.env.NODE_ENV ||
        defaultConfig.nodeEnv,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : defaultConfig.port,
    mongoUri: process.env.MONGO_URI || defaultConfig.mongoUri,
    jwtSecret: process.env.JWT_SECRET || defaultConfig.jwtSecret,
    brawlStarsApiKey: process.env.BRAWLSTARS_API_KEY || defaultConfig.brawlStarsApiKey,
    brawlStarsApiUrl: process.env.BRAWLSTARS_API_URL || defaultConfig.brawlStarsApiUrl,
    logLevel: process.env.LOG_LEVEL || defaultConfig.logLevel,
};
// Validate required configuration
const validateConfig = () => {
    const requiredEnvs = ["mongoUri", "brawlStarsApiKey"];
    for (const env of requiredEnvs) {
        if (!config[env]) {
            throw new Error(`Environment variable ${env} is required`);
        }
    }
};
// Only validate in production to make development easier
if (config.nodeEnv === "production") {
    validateConfig();
}
exports.default = config;
