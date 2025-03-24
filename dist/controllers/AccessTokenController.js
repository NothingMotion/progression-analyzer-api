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
exports.AccessTokenController = void 0;
const ControllerNoCrudDBBase_1 = require("./ControllerNoCrudDBBase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AccessTokenController extends ControllerNoCrudDBBase_1.ControllerNoCrudDBBase {
    constructor() {
        super();
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization, "application-request-sender": applicationRequestSender, } = req.headers;
            if (!authorization) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            if (!applicationRequestSender || applicationRequestSender !== "android") {
                res.status(401).json({ message: "You cannot access this endpoint" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(authorization, process.env.APPLICATION_FRONTEND_JWT_SECRET);
            if (!decoded) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const accessToken = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
            }, process.env.JWT_SECRET, { expiresIn: "1d" });
            const response = {
                token: accessToken,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            };
            res.status(200).json({ message: "Authorized", response });
        });
    }
    getRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const accessToken = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
            }, process.env.JWT_SECRET, { expiresIn: "40m" });
            res.status(200).json({ message: "Authorized", accessToken });
        });
    }
}
exports.AccessTokenController = AccessTokenController;
