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
exports.AccountController = void 0;
const ControllerBase_1 = require("./ControllerBase");
const AccountUtils_1 = require("../utils/AccountUtils");
const BrawlStarsAPI_1 = require("../lib/BrawlStarsAPI");
class AccountController extends ControllerBase_1.ControllerBase {
    isMatch(data) {
        return data && typeof data === "object" && "account" in data;
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountTag = req.params.tag;
                const isValid = AccountUtils_1.AccountUtils.isValidTag(accountTag);
                if (!accountTag) {
                    this.sendErrorResponse(res, new Error("Invalid account tag"), 400);
                    return;
                }
                if (!isValid) {
                    this.sendErrorResponse(res, new Error("Invalid account tag"), 400);
                    return;
                }
                const account = yield this.crudDB.readByQuery({
                    account: { tag: accountTag },
                });
                if (!account || account.length === 0) {
                    // inserting account
                    const parsedTag = AccountUtils_1.AccountUtils.parseTag(accountTag);
                    const account = yield AccountUtils_1.AccountUtils.getAccount(parsedTag);
                    if (!account) {
                        this.sendErrorResponse(res, new Error("Account not found"), 404);
                        return;
                    }
                    if (account instanceof Error) {
                        this.sendErrorResponse(res, account, 500);
                        return;
                    }
                    yield this.crudDB.create(account);
                    this.sendSuccessResponse(res, account);
                }
            }
            catch (error) {
                if (error instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, error, error.statusCode);
                }
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    refreshById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const account = yield AccountUtils_1.AccountUtils.updateAccount(id);
                if (!account) {
                    this.sendErrorResponse(res, new Error("Account not found"), 404);
                    return;
                }
                if (account instanceof Error) {
                    this.sendErrorResponse(res, account);
                    return;
                }
                this.sendSuccessResponse(res, account);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    refreshAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield this.crudDB.readAll();
                for (const account of accounts) {
                    // todo: refresh account
                }
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { limit, offset } = req.query;
                const account = yield this.crudDB.readByQuery({ account: { tag: id } });
                if (!account || account.length === 0) {
                    this.sendErrorResponse(res, new Error("History not found"), 404);
                    return;
                }
                const history = account[0].history;
                const paginatedHistory = history.slice(offset ? parseInt(offset) : 0, limit ? parseInt(limit) : 10);
                const response = {
                    length: history.length,
                    history: paginatedHistory,
                    offset: offset ? parseInt(offset) : 0,
                    limit: limit ? parseInt(limit) : 10,
                };
                res.status(200).json(response);
            }
            catch (error) {
                this.sendErrorResponse(res, error);
            }
        });
    }
}
exports.AccountController = AccountController;
