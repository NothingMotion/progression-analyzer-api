"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BrawlStarsAPI_1 = __importDefault(require("../lib/BrawlStarsAPI"));
const dotenv_1 = __importDefault(require("dotenv"));
// Initialize environment variables
dotenv_1.default.config();
/**
 * Singleton provider for BrawlStarsAPI
 * Ensures only one instance of the API client exists across the application
 */
class BrawlStarsAPIProvider {
    /**
     * Private constructor to prevent direct instantiation
     */
    constructor() { }
    /**
     * Get the singleton instance of BrawlStarsAPI
     * Creates the instance on first call, reuses it after
     */
    static getInstance() {
        if (!BrawlStarsAPIProvider.instance) {
            const apiKey = process.env.BRAWLSTARS_API_KEY;
            if (!apiKey) {
                throw new Error("BRAWLSTARS_API_KEY environment variable is not set");
            }
            BrawlStarsAPIProvider.instance = new BrawlStarsAPI_1.default(process.env.BRAWLSTARS_API_URL || "https://api.brawlstars.com/v1", process.env.BRAWLSTARS_API_URL_EXTRA ||
                "https://brawltime.ninja/api/player.byTagExtra?", apiKey);
        }
        return BrawlStarsAPIProvider.instance;
    }
    /**
     * Reset the singleton instance (primarily for testing purposes)
     */
    static resetInstance() {
        BrawlStarsAPIProvider.instance = null;
    }
}
BrawlStarsAPIProvider.instance = null;
exports.default = BrawlStarsAPIProvider;
