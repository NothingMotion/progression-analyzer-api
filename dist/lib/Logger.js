"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static log(message) {
        console.log(message);
    }
    static error(message) {
        console.error(message);
    }
    static warn(message) {
        console.warn(message);
    }
}
exports.default = Logger;
