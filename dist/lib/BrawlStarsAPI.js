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
const axios_1 = __importStar(require("axios"));
var BrawlStarsAPIError;
(function (BrawlStarsAPIError) {
    BrawlStarsAPIError["InvalidTag"] = "Invalid tag";
    BrawlStarsAPIError["Unauthorized"] = "Unauthorized";
    BrawlStarsAPIError["Forbidden"] = "Forbidden";
    BrawlStarsAPIError["AccountNotFound"] = "Account not found";
    BrawlStarsAPIError["RateLimitExceeded"] = "Rate limit exceeded";
    BrawlStarsAPIError["InternalServerError"] = "Internal server error";
    BrawlStarsAPIError["ServiceUnavailable"] = "Service unavailable";
})(BrawlStarsAPIError || (BrawlStarsAPIError = {}));
class BrawlStarsAPI {
    constructor() {
        this.baseUrl = "https://api.brawlapi.com/v1";
        this.apiKey = process.env.BRAWL_STARS_API_KEY || "";
    }
    get(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/account/${tag}`, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                });
                return response.data;
            }
            catch (error) {
                if (error instanceof axios_1.AxiosError) {
                    switch ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) {
                        case 400:
                            throw new Error(BrawlStarsAPIError.InvalidTag);
                        case 401:
                            throw new Error(BrawlStarsAPIError.Unauthorized);
                        case 403:
                            throw new Error(BrawlStarsAPIError.Forbidden);
                        case 404:
                            throw new Error(BrawlStarsAPIError.AccountNotFound);
                        case 429:
                            throw new Error(BrawlStarsAPIError.RateLimitExceeded);
                        case 500:
                            throw new Error(BrawlStarsAPIError.InternalServerError);
                        case 503:
                            throw new Error(BrawlStarsAPIError.ServiceUnavailable);
                        default:
                            throw error;
                    }
                }
                console.error("Error fetching account:", error);
                throw error;
            }
        });
    }
}
exports.default = BrawlStarsAPI;
