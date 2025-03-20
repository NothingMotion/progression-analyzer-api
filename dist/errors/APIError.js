"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(message) {
        super(message);
    }
    static RateLimitExceeded(message) {
        return new APIError(message);
    }
    static InternalServerError(message) {
        return new APIError(message);
    }
}
exports.APIError = APIError;
