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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlStarsAPIError = void 0;
const axios_1 = __importStar(require("axios"));
const BrawlStarsAPIError_1 = require("../errors/BrawlStarsAPIError");
Object.defineProperty(exports, "BrawlStarsAPIError", { enumerable: true, get: function () { return BrawlStarsAPIError_1.BrawlStarsAPIError; } });
var BrawlStarsAPIError2;
(function (BrawlStarsAPIError2) {
    BrawlStarsAPIError2["InvalidTag"] = "Invalid tag";
    BrawlStarsAPIError2["Unauthorized"] = "Unauthorized";
    BrawlStarsAPIError2["Forbidden"] = "Forbidden";
    BrawlStarsAPIError2["AccountNotFound"] = "Account not found";
    BrawlStarsAPIError2["RateLimitExceeded"] = "Rate limit exceeded";
    BrawlStarsAPIError2["InternalServerError"] = "Internal server error";
    BrawlStarsAPIError2["ServiceUnavailable"] = "Service unavailable";
})(BrawlStarsAPIError2 || (BrawlStarsAPIError2 = {}));
class BrawlStarsAPI {
    constructor(baseUrl = "https://api.brawlstars.com/v1", apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        if (!apiKey)
            throw new Error("API key is required");
        this.apiKey = apiKey;
    }
    get(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/players/%23${tag}`, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        "Content-Type": "application/json",
                        "Cache-Control": "public, max-age=600",
                    },
                });
                return response.data;
            }
            catch (error) {
                if (error instanceof axios_1.AxiosError) {
                    switch ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) {
                        case 400:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.InvalidTag((_b = error.response) === null || _b === void 0 ? void 0 : _b.data.message);
                        case 401:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.Unauthorized((_c = error.response) === null || _c === void 0 ? void 0 : _c.data.message);
                        case 403:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.Forbidden((_d = error.response) === null || _d === void 0 ? void 0 : _d.data.message);
                        case 404:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.AccountNotFound((_e = error.response) === null || _e === void 0 ? void 0 : _e.data.message);
                        case 429:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.RateLimitExceeded((_f = error.response) === null || _f === void 0 ? void 0 : _f.data.message);
                        case 500:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError((_g = error.response) === null || _g === void 0 ? void 0 : _g.data.message);
                        case 503:
                            throw BrawlStarsAPIError_1.BrawlStarsAPIError.ServiceUnavailable((_h = error.response) === null || _h === void 0 ? void 0 : _h.data.message);
                        default:
                            throw error;
                    }
                }
                console.error("Error fetching account:", error);
                throw BrawlStarsAPIError_1.BrawlStarsAPIError.InternalServerError("Internal server error");
            }
        });
    }
}
exports.default = BrawlStarsAPI;
