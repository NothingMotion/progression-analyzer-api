"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.brawlStarsAPIService = exports.BrawlStarsAPIService = exports.BrawlStarsAPIError = void 0;
const axios_1 = __importStar(require("axios"));
const config_1 = __importDefault(require("../config"));
const logger_1 = require("../utils/logger");
const errorHandler_1 = require("../middlewares/errorHandler");
const logger = (0, logger_1.createLogger)("BrawlStarsAPIService");
var BrawlStarsAPIError;
(function (BrawlStarsAPIError) {
    BrawlStarsAPIError["InvalidTag"] = "Invalid tag";
    BrawlStarsAPIError["Unauthorized"] = "Unauthorized";
    BrawlStarsAPIError["Forbidden"] = "Forbidden";
    BrawlStarsAPIError["AccountNotFound"] = "Account not found";
    BrawlStarsAPIError["RateLimitExceeded"] = "Rate limit exceeded";
    BrawlStarsAPIError["InternalServerError"] = "Internal server error";
    BrawlStarsAPIError["ServiceUnavailable"] = "Service unavailable";
})(BrawlStarsAPIError || (exports.BrawlStarsAPIError = BrawlStarsAPIError = {}));
/**
 * Service for interacting with the Brawl Stars API
 */
class BrawlStarsAPIService {
    constructor() {
        // Create a configured axios instance
        this.apiClient = axios_1.default.create({
            baseURL: config_1.default.brawlStarsApiUrl,
            headers: {
                Authorization: `Bearer ${config_1.default.brawlStarsApiKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            timeout: 10000, // 10 second timeout
        });
        // Add request interceptor for logging
        this.apiClient.interceptors.request.use((config) => {
            var _a;
            logger.debug(`API Request: ${(_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            logger.error("API Request Error", error);
            return Promise.reject(error);
        });
        // Add response interceptor for logging
        this.apiClient.interceptors.response.use((response) => {
            logger.debug(`API Response: ${response.status} ${response.config.url}`);
            return response;
        }, (error) => {
            logger.error("API Response Error", error);
            return Promise.reject(error);
        });
    }
    /**
     * Normalize player tag - remove # if present
     */
    normalizeTag(tag) {
        return tag.startsWith("#") ? tag.substring(1) : tag;
    }
    /**
     * Get player information by tag
     */
    getPlayerByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const normalizedTag = this.normalizeTag(tag);
                const response = yield this.apiClient.get(`/players/%23${normalizedTag}`, {
                    headers: {
                        "Cache-Control": "public, max-age=600", // Cache for 10 minutes
                    },
                });
                return response.data;
            }
            catch (error) {
                // Handle API-specific errors
                if (error instanceof axios_1.AxiosError && error.response) {
                    const { status } = error.response;
                    switch (status) {
                        case 400:
                            throw new errorHandler_1.ApiError(400, BrawlStarsAPIError.InvalidTag);
                        case 401:
                            throw new errorHandler_1.ApiError(401, BrawlStarsAPIError.Unauthorized);
                        case 403:
                            throw new errorHandler_1.ApiError(403, BrawlStarsAPIError.Forbidden);
                        case 404:
                            throw new errorHandler_1.ApiError(404, BrawlStarsAPIError.AccountNotFound);
                        case 429:
                            throw new errorHandler_1.ApiError(429, BrawlStarsAPIError.RateLimitExceeded);
                        case 500:
                            throw new errorHandler_1.ApiError(500, BrawlStarsAPIError.InternalServerError);
                        case 503:
                            throw new errorHandler_1.ApiError(503, BrawlStarsAPIError.ServiceUnavailable);
                        default:
                            throw new errorHandler_1.ApiError(status, `API Error: ${error.message}`);
                    }
                }
                // Handle other errors
                logger.error("Unexpected error fetching player data", error);
                throw new errorHandler_1.ApiError(500, "Unexpected error fetching player data");
            }
        });
    }
}
exports.BrawlStarsAPIService = BrawlStarsAPIService;
// Create a singleton instance
exports.brawlStarsAPIService = new BrawlStarsAPIService();
