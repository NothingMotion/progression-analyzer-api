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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlStarsAPIError = void 0;
const axios_1 = __importStar(require("axios"));
const BrawlStarsAPIError_1 = require("../errors/BrawlStarsAPIError");
Object.defineProperty(exports, "BrawlStarsAPIError", { enumerable: true, get: function () { return BrawlStarsAPIError_1.BrawlStarsAPIError; } });
const Logger_1 = __importDefault(require("./Logger"));
class BrawlStarsAPI {
    constructor(baseUrl = "https://api.brawlstars.com/v1", baseUrlAlternative = "https://brawltime.ninja/api/player.byTag?", baseUrlExtra = "https://brawltime.ninja/api/player.byTagExtra?", apiKey = "") {
        this.baseUrl = baseUrl;
        this.baseUrlAlternative = baseUrlAlternative;
        this.baseUrlExtra = baseUrlExtra;
        // Only validate API key if we're using the official API
        if (baseUrl.includes("api.brawlstars.com") && !apiKey) {
            Logger_1.default.log("Warning: No API key provided for official Brawl Stars API");
        }
        this.apiKey = apiKey;
    }
    get(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                // Use the exact same URL format as the working curl command
                const url = `${this.baseUrlAlternative}input=%7B%22json%22%3A%22${tag}%22%7D`;
                const response = yield axios_1.default.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "PostmanRuntime/7.43.3",
                        Accept: "*/*",
                        Connection: "keep-alive",
                    },
                    timeout: 4000,
                    proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
                });
                const data = response.data.result.data.json;
                if (!data) {
                    throw BrawlStarsAPIError_1.BrawlStarsAPIError.AccountNotFound("Account data not found in response");
                }
                // Create a new clean object without unwanted properties
                const cleanedData = Object.assign({}, data);
                // Process brawlers - convert from object to array
                const brawlersArray = [];
                if (cleanedData.brawlers && typeof cleanedData.brawlers === "object") {
                    for (const key of Object.keys(cleanedData.brawlers)) {
                        const brawler = cleanedData.brawlers[key];
                        if (brawler && typeof brawler === "object") {
                            brawlersArray.push(brawler);
                        }
                    }
                }
                if (brawlersArray.length === 0 &&
                    Object.keys(cleanedData.brawlers || {}).length > 0) {
                    Logger_1.default.log(`Warning: Failed to parse brawlers data for tag ${tag}`);
                }
                // Remove unwanted properties
                const { battles, meta } = cleanedData, accountData = __rest(cleanedData, ["battles", "meta"]);
                // Replace brawlers object with array
                accountData.brawlers = brawlersArray;
                console.log(accountData);
                return accountData;
            }
            catch (error) {
                if (error instanceof BrawlStarsAPIError_1.BrawlStarsAPIError) {
                    throw error;
                }
                if (error instanceof axios_1.AxiosError) {
                    switch ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) {
                        case 400:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.InvalidTag(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data.message) || "Invalid tag");
                        case 401:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.Unauthorized(((_c = error.response) === null || _c === void 0 ? void 0 : _c.data.message) || "Unauthorized");
                        case 403:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.Forbidden(((_d = error.response) === null || _d === void 0 ? void 0 : _d.data.message) || "Forbidden");
                        case 404:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.AccountNotFound(((_e = error.response) === null || _e === void 0 ? void 0 : _e.data.message) || "Account not found");
                        case 429:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.RateLimitExceeded(((_f = error.response) === null || _f === void 0 ? void 0 : _f.data.message) || "Rate limit exceeded");
                        case 500:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError(((_g = error.response) === null || _g === void 0 ? void 0 : _g.data.message) || "Internal server error");
                        case 503:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.ServiceUnavailable(((_h = error.response) === null || _h === void 0 ? void 0 : _h.data.message) || "Service unavailable");
                        default:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError("Unknown error occurred");
                    }
                }
                Logger_1.default.log(`Error fetching account: ${error}`);
                throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError("Internal server error");
            }
        });
    }
    getExtra(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Use the exact same URL format as the working get method
                const url = `${this.baseUrlExtra}input=%7B%22json%22%3A%22${tag}%22%7D`;
                const response = yield axios_1.default.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        Accept: "*/*",
                        Connection: "keep-alive",
                    },
                    timeout: 4000,
                    proxy: this.shouldUseProxy() ? this.getProxyConfig() : false,
                });
                if (!response.data || !response.data.result) {
                    throw BrawlStarsAPIError_1.BrawlStarsAPIError.AccountNotFound("Extra account data not found");
                }
                return response.data;
            }
            catch (error) {
                if (error instanceof BrawlStarsAPIError_1.BrawlStarsAPIError) {
                    throw error;
                }
                if (error instanceof axios_1.AxiosError) {
                    throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Error fetching extra data");
                }
                Logger_1.default.log(`Error fetching extra account data: ${error}`);
                throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError("Internal server error");
            }
        });
    }
    shouldUseProxy() {
        const shouldUse = process.env.USE_PROXY === "true";
        Logger_1.default.log(shouldUse ? "Using proxy" : "Not using proxy"); //
        return shouldUse;
    }
    getProxyConfig() {
        const proxyConfig = {
            host: process.env.PROXY_URL || "",
            port: parseInt(process.env.PROXY_PORT || "8080"),
            auth: {
                username: process.env.PROXY_USERNAME || "",
                password: process.env.PROXY_PASSWORD || "",
            },
            protocol: process.env.PROXY_TYPE || "http",
        };
        // console.log(proxyConfig);
        return proxyConfig;
    }
}
exports.default = BrawlStarsAPI;
