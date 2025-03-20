"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountRouter_1 = require("./routers/accountRouter");
const accessTokenRouter_1 = require("./routers/accessTokenRouter");
const app = (0, express_1.default)();
app.use("/api/v1/accounts", accountRouter_1.router);
app.use("/api/v1/token", accessTokenRouter_1.accessTokenRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
