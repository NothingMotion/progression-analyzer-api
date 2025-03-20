"use strict";
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
exports.BaseController = exports.asyncHandler = void 0;
const errorHandler_1 = require("../middlewares/errorHandler");
const logger_1 = require("../utils/logger");
const logger = (0, logger_1.createLogger)("BaseController");
// Utility to wrap async handlers with error handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
class BaseController {
    constructor(repository) {
        /**
         * Create a new resource
         */
        this.create = (0, exports.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield this.repository.create(data);
            return res.status(201).json({
                success: true,
                data: result,
            });
        }));
        /**
         * Get resource by ID
         */
        this.getById = (0, exports.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.repository.findById(id);
            if (!result) {
                throw new errorHandler_1.ApiError(404, "Resource not found");
            }
            return res.status(200).json({
                success: true,
                data: result,
            });
        }));
        /**
         * Get all resources
         */
        this.getAll = (0, exports.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const filter = req.query.filter ? JSON.parse(String(req.query.filter)) : {};
            const results = yield this.repository.find(filter);
            return res.status(200).json({
                success: true,
                count: results.length,
                data: results,
            });
        }));
        /**
         * Update resource by ID
         */
        this.update = (0, exports.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const result = yield this.repository.update(id, data);
            if (!result) {
                throw new errorHandler_1.ApiError(404, "Resource not found");
            }
            return res.status(200).json({
                success: true,
                data: result,
            });
        }));
        /**
         * Delete resource by ID
         */
        this.delete = (0, exports.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.repository.delete(id);
            if (!result) {
                throw new errorHandler_1.ApiError(404, "Resource not found");
            }
            return res.status(204).send();
        }));
        this.repository = repository;
        // Bind methods to ensure correct 'this' context
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
}
exports.BaseController = BaseController;
