"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.createLogger = createLogger;
const config_1 = __importDefault(require("../config"));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
// Map string log levels to enum
const LOG_LEVEL_MAP = {
    error: LogLevel.ERROR,
    warn: LogLevel.WARN,
    info: LogLevel.INFO,
    debug: LogLevel.DEBUG,
};
// Get the current log level from config
const currentLogLevel = LOG_LEVEL_MAP[config_1.default.logLevel.toLowerCase()] || LogLevel.INFO;
class Logger {
    constructor(context) {
        this.context = context;
    }
    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
    }
    debug(message, ...args) {
        if (currentLogLevel >= LogLevel.DEBUG) {
            console.debug(this.formatMessage("debug", message), ...args);
        }
    }
    info(message, ...args) {
        if (currentLogLevel >= LogLevel.INFO) {
            console.info(this.formatMessage("info", message), ...args);
        }
    }
    warn(message, ...args) {
        if (currentLogLevel >= LogLevel.WARN) {
            console.warn(this.formatMessage("warn", message), ...args);
        }
    }
    error(message, error, ...args) {
        if (currentLogLevel >= LogLevel.ERROR) {
            console.error(this.formatMessage("error", message), error || "", ...args);
        }
    }
}
function createLogger(context) {
    return new Logger(context);
}
// Create a default logger
exports.logger = createLogger("App");
