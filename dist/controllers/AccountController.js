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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const ControllerBase_1 = require("./ControllerBase");
const AccountUtils_1 = require("../utils/AccountUtils");
const BrawlStarsAPI_1 = require("../lib/BrawlStarsAPI");
const di_1 = require("../di");
const Logger_1 = __importDefault(require("../lib/Logger"));
const sleep_1 = require("../utils/sleep");
class AccountController extends ControllerBase_1.ControllerBase {
    constructor(crudDB, historyCrudDB) {
        super(crudDB);
        this.historyCrudDB = historyCrudDB;
    }
    isMatch(data) {
        return data && typeof data === "object" && "account" in data;
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountTag = AccountUtils_1.AccountUtils.convertTag(req.params.id);
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
                    "account.tag": accountTag,
                });
                if (!account || account.length === 0) {
                    console.log(`AccountController::get, couldn't find account: ${accountTag}`);
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
                else {
                    this.sendSuccessResponse(res, account, 200);
                }
            }
            catch (error) {
                if (error instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, error, error.statusCode);
                    return;
                }
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const account = yield this.crudDB.readByQuery({
                    "account.tag": AccountUtils_1.AccountUtils.convertTag(id),
                });
                if (!account || account.length === 0) {
                    this.sendErrorResponse(res, new Error("Account not found"), 404);
                    return;
                }
                yield this.historyCrudDB.deleteByOne({
                    accountId: account[0]._id,
                });
                yield this.crudDB.deleteByOne({
                    "account.tag": AccountUtils_1.AccountUtils.convertTag(id),
                });
                this.sendSuccessResponse(res, account);
            }
            catch (error) {
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const account = yield this.crudDB.readByQuery({
                    "account.tag": AccountUtils_1.AccountUtils.convertTag(id),
                });
                if (!account || account.length === 0) {
                    this.sendErrorResponse(res, new Error("Account not found"), 404);
                    return;
                }
                if (this.isMatch(req.body)) {
                    const updatedAccount = yield this.crudDB.updateOneByQuery({ "account.tag": AccountUtils_1.AccountUtils.convertTag(id) }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, strict: true });
                    this.sendSuccessResponse(res, updatedAccount);
                }
                else {
                    this.sendErrorResponse(res, new Error("Invalid account data"), 400);
                    return;
                }
            }
            catch (error) {
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    getRaw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!AccountUtils_1.AccountUtils.isValidTag(id)) {
                    this.sendErrorResponse(res, new Error("Invalid Account Tag"), 400);
                    return;
                }
                const parsedTag = AccountUtils_1.AccountUtils.parseTag(id);
                const bs = di_1.BrawlStarsAPIProvider.getInstance();
                const account = yield bs.get(parsedTag);
                if (account instanceof Error) {
                    this.sendErrorResponse(res, account);
                    return;
                }
                res.status(200).json(account);
            }
            catch (error) {
                if (error instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, error, error.statusCode);
                    return;
                }
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    getExtra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!AccountUtils_1.AccountUtils.isValidTag(id)) {
                    this.sendErrorResponse(res, new Error("Invalid Account Tag"), 400);
                    return;
                }
                const parsedTag = AccountUtils_1.AccountUtils.parseTag(id);
                const account = yield di_1.BrawlStarsAPIProvider.getInstance().getExtra(parsedTag);
                if (account instanceof Error) {
                    this.sendErrorResponse(res, account);
                    return;
                }
                res.status(200).json(account);
            }
            catch (error) {
                this.sendErrorResponse(res, error, 500);
            }
        });
    }
    refreshById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const accountTag = AccountUtils_1.AccountUtils.convertTag(id);
                const account = yield this.crudDB.readByQuery({
                    "account.tag": accountTag,
                });
                if (!account || account.length === 0) {
                    console.log(`AccountController::refreshById, couldn't find account: ${accountTag}`);
                    this.sendErrorResponse(res, new Error("Account not found"), 404);
                    return;
                }
                if (account instanceof Error) {
                    this.sendErrorResponse(res, account);
                    return;
                }
                if (Date.now() - account[0].updatedAt.getTime() < 1000 * 60 * 60 * 24) {
                    // 1day
                    this.sendSuccessResponse(res, account[0]);
                    return;
                }
                const updated = yield AccountUtils_1.AccountUtils.updateAccount(accountTag);
                if (!updated) {
                    this.sendErrorResponse(res, new Error("Account didn't update"), 404);
                    return;
                }
                if (updated instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, updated, updated.statusCode);
                    return;
                }
                if (updated instanceof Error) {
                    this.sendErrorResponse(res, updated);
                    return;
                }
                const history = yield this.historyCrudDB.readByQuery({
                    accountId: updated._id,
                });
                if (!(history instanceof Error)) {
                    updated.history = history;
                }
                this.sendSuccessResponse(res, updated);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, error, error.statusCode);
                    return;
                }
                this.sendErrorResponse(res, error);
            }
        });
    }
    refreshAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            try {
                Logger_1.default.log("Refreshing all accounts");
                const accounts = yield this.crudDB.readAll();
                if (!accounts || accounts.length === 0) {
                    this.sendErrorResponse(res, new Error("No accounts found"), 404);
                    return;
                }
                this.sendSuccessResponse(res, []);
                console.log(`Starting refresh accounts job ${new Date().toISOString()}`);
                let i = 0;
                try {
                    for (var _d = true, accounts_1 = __asyncValues(accounts), accounts_1_1; accounts_1_1 = yield accounts_1.next(), _a = accounts_1_1.done, !_a; _d = true) {
                        _c = accounts_1_1.value;
                        _d = false;
                        const account = _c;
                        // todo: refresh account
                        try {
                            console.log(`Refreshing account ${account.account.tag} job ${i}`);
                            const id = account.account.tag;
                            if (Date.now() - account.updatedAt.getTime() < 1000 * 60 * 60 * 24) {
                                // 1day
                                continue;
                            }
                            const updated = yield AccountUtils_1.AccountUtils.updateAccount(id);
                            if (!updated || updated instanceof Error)
                                continue;
                        }
                        catch (error) {
                            Logger_1.default.error(error.message);
                        }
                        finally {
                            i++;
                            yield (0, sleep_1.sleep)(1000);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = accounts_1.return)) yield _b.call(accounts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                console.log(`Finished refresh accounts job ${new Date().toISOString()}`);
            }
            catch (error) {
                if (error instanceof BrawlStarsAPI_1.BrawlStarsAPIError) {
                    this.sendErrorResponse(res, error, error.statusCode);
                    return;
                }
                this.sendErrorResponse(res, error);
            }
        });
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { limit, offset } = req.query;
                const account = yield this.crudDB.readByQuery({
                    "account.tag": AccountUtils_1.AccountUtils.convertTag(id),
                });
                if (!account || account.length === 0) {
                    this.sendErrorResponse(res, new Error("Account not found"), 404);
                    return;
                }
                const history = yield this.historyCrudDB.readByQuery({
                    accountId: account[0]._id,
                });
                if (!history || history.length === 0) {
                    this.sendErrorResponse(res, new Error("History not found"), 404);
                    return;
                }
                const paginatedHistory = history
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                    .slice(offset ? parseInt(offset) : 0, limit ? parseInt(limit) : 10);
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
