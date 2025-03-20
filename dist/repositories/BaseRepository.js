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
exports.BaseRepository = void 0;
const mongoose_1 = require("mongoose");
const logger_1 = require("../utils/logger");
const errorHandler_1 = require("../middlewares/errorHandler");
const logger = (0, logger_1.createLogger)("BaseRepository");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    /**
     * Create a new document
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = new this.model(data);
                yield document.save();
                logger.debug(`Created document with id: ${document._id}`);
                return document;
            }
            catch (error) {
                logger.error("Error creating document", error);
                if (error.name === "ValidationError") {
                    throw new errorHandler_1.ApiError(400, `Validation error: ${error.message}`);
                }
                if (error.name === "MongoServerError" &&
                    error.code === 11000) {
                    throw new errorHandler_1.ApiError(409, "Document with this data already exists");
                }
                throw new errorHandler_1.ApiError(500, `Error creating document: ${error.message}`);
            }
        });
    }
    /**
     * Find document by ID
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    throw new errorHandler_1.ApiError(400, "Invalid ID format");
                }
                const document = yield this.model.findById(id);
                if (!document) {
                    logger.debug(`Document not found with id: ${id}`);
                    return null;
                }
                logger.debug(`Found document with id: ${id}`);
                return document;
            }
            catch (error) {
                if (error instanceof errorHandler_1.ApiError) {
                    throw error;
                }
                logger.error(`Error finding document with id: ${id}`, error);
                throw new errorHandler_1.ApiError(500, `Error finding document: ${error.message}`);
            }
        });
    }
    /**
     * Find document by query
     */
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findOne(query);
                return document;
            }
            catch (error) {
                logger.error("Error finding document", error);
                throw new errorHandler_1.ApiError(500, `Error finding document: ${error.message}`);
            }
        });
    }
    /**
     * Find all documents or documents matching a query
     */
    find() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            try {
                const documents = yield this.model.find(query);
                logger.debug(`Found ${documents.length} documents`);
                return documents;
            }
            catch (error) {
                logger.error("Error finding documents", error);
                throw new errorHandler_1.ApiError(500, `Error finding documents: ${error.message}`);
            }
        });
    }
    /**
     * Update document by ID
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    throw new errorHandler_1.ApiError(400, "Invalid ID format");
                }
                const document = yield this.model.findByIdAndUpdate(id, data, {
                    new: true,
                    runValidators: true,
                });
                if (!document) {
                    logger.debug(`Document not found with id: ${id}`);
                    return null;
                }
                logger.debug(`Updated document with id: ${id}`);
                return document;
            }
            catch (error) {
                if (error instanceof errorHandler_1.ApiError) {
                    throw error;
                }
                logger.error(`Error updating document with id: ${id}`, error);
                if (error.name === "ValidationError") {
                    throw new errorHandler_1.ApiError(400, `Validation error: ${error.message}`);
                }
                throw new errorHandler_1.ApiError(500, `Error updating document: ${error.message}`);
            }
        });
    }
    /**
     * Delete document by ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    throw new errorHandler_1.ApiError(400, "Invalid ID format");
                }
                const document = yield this.model.findByIdAndDelete(id);
                if (!document) {
                    logger.debug(`Document not found with id: ${id}`);
                    return null;
                }
                logger.debug(`Deleted document with id: ${id}`);
                return document;
            }
            catch (error) {
                if (error instanceof errorHandler_1.ApiError) {
                    throw error;
                }
                logger.error(`Error deleting document with id: ${id}`, error);
                throw new errorHandler_1.ApiError(500, `Error deleting document: ${error.message}`);
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
