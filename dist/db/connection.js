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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
// Connection options
const options = {
// No need to set useNewUrlParser, useUnifiedTopology, useFindAndModify, or useCreateIndex
// as they are deprecated and set to true by default in Mongoose 6+
};
/**
 * Connect to MongoDB with proper error handling
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(config_1.default.mongoUri, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Add event listeners for connection events
        mongoose_1.default.connection.on("error", (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected. Attempting to reconnect...");
        });
        // Handle app termination - close mongoose connection
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connection.close();
                console.log("MongoDB connection closed due to app termination");
                process.exit(0);
            }
            catch (err) {
                console.error("Error closing MongoDB connection:", err);
                process.exit(1);
            }
        }));
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
/**
 * Close the MongoDB connection
 */
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        console.log("MongoDB connection closed");
    }
    catch (error) {
        console.error(`Error closing MongoDB connection: ${error}`);
        throw error;
    }
});
exports.closeConnection = closeConnection;
