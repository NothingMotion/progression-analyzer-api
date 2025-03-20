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
exports.ControllerBase = void 0;
class ControllerBase {
    constructor(crudDB) {
        this.crudDB = crudDB;
    }
    sendSuccessResponse(res, data, statusCode = 200) {
        res.status(statusCode).json(data);
    }
    sendErrorResponse(res, error, statusCode = 500) {
        res.status(statusCode).json({ message: error.message });
    }
    isMatch(data) {
        return typeof data === "object" && data !== null && "id" in data;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (this.isMatch(data)) {
                    const newData = yield this.crudDB.create(data);
                    this.sendSuccessResponse(res, newData, 201);
                }
                else {
                    this.sendErrorResponse(res, new Error("Invalid data"), 400);
                }
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.crudDB.read({ id });
                this.sendSuccessResponse(res, data);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.crudDB.readAll();
                this.sendSuccessResponse(res, data);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedData = yield this.crudDB.update(id, data);
                this.sendSuccessResponse(res, updatedData);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.crudDB.delete(id);
                this.sendSuccessResponse(res, undefined, 204);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
}
exports.ControllerBase = ControllerBase;
