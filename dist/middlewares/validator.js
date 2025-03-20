"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchemas = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const errorHandler_1 = require("./errorHandler");
/**
 * Middleware to validate request data against a Joi schema
 * @param schema Joi schema to validate against
 * @param property Request property to validate (body, params, query)
 */
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });
        if (!error) {
            return next();
        }
        const details = error.details.map((detail) => ({
            path: detail.path.join("."),
            message: detail.message,
        }));
        const message = "Validation failed";
        throw new errorHandler_1.ApiError(400, message, true, undefined);
    };
};
exports.validate = validate;
/**
 * Common validation schemas
 */
exports.validationSchemas = {
    id: joi_1.default.object({
        id: joi_1.default.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/)
            .messages({
            "string.pattern.base": "ID must be a valid MongoDB ObjectId",
        }),
    }),
    // Example validation schema for player tag
    playerTag: joi_1.default.object({
        tag: joi_1.default.string()
            .required()
            .trim()
            .pattern(/^#?[0-9A-Z]{3,}$/)
            .messages({
            "string.empty": "Player tag cannot be empty",
            "string.pattern.base": "Player tag must be at least 3 alphanumeric characters",
        }),
    }),
    // Pagination schema
    pagination: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).default(1),
        limit: joi_1.default.number().integer().min(1).max(100).default(10),
        sort: joi_1.default.string(),
    }),
};
