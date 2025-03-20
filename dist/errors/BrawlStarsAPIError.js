"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlStarsAPIError = void 0;
class BrawlStarsAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
    static InvalidTag(message) {
        return new BrawlStarsAPIError(message, 400);
    }
    static Unauthorized(message) {
        return new BrawlStarsAPIError(message, 401);
    }
    static Forbidden(message) {
        return new BrawlStarsAPIError(message, 403);
    }
    static AccountNotFound(message) {
        return new BrawlStarsAPIError(message, 404);
    }
    static RateLimitExceeded(message) {
        return new BrawlStarsAPIError(message, 429);
    }
    static InternalServerError(message) {
        return new BrawlStarsAPIError(message, 500);
    }
    static ServiceUnavailable(message) {
        return new BrawlStarsAPIError(message, 503);
    }
}
exports.BrawlStarsAPIError = BrawlStarsAPIError;
