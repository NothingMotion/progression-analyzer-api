"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.ApiError = void 0;
const logger_1 = require("../utils/logger");
const config_1 = __importDefault(require("../config"));
const logger = (0, logger_1.createLogger)("ErrorHandler");
// Custom error class for API errors
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
// Handle 404 errors
const notFoundHandler = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
// Global error handler
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    // Default values
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails = {};
    // If it's our ApiError, use its statusCode and message
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else {
        message = err.message || message;
    }
    // Only include stack trace in development
    if (config_1.default.nodeEnv === "development") {
        errorDetails = {
            stack: err.stack,
        };
    }
    // Log the error
    logger.error(`Error: ${message}`, err);
    // Return a standard error response
    return res.status(statusCode).json({
        success: false,
        error: Object.assign({ message }, (Object.keys(errorDetails).length > 0
            ? { details: errorDetails }
            : {})),
    });
};
exports.errorHandler = errorHandler;
