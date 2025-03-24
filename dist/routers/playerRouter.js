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
exports.router = void 0;
const express_1 = require("express");
const CrudDBBase_1 = __importDefault(require("../controllers/CrudDBBase"));
const AccountModel_1 = require("../models/AccountModel");
const AccountUtils_1 = require("../utils/AccountUtils");
const router = (0, express_1.Router)();
exports.router = router;
const accountDb = new CrudDBBase_1.default(AccountModel_1.AccountModel);
router.route("/:tag").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = req.params.tag;
        const account = yield accountDb
            .readByQuery({ "account.account.tag": tag })
            .then((account) => __awaiter(void 0, void 0, void 0, function* () {
            if (account.length === 0) {
                // create account steps..
                const parsedTag = AccountUtils_1.AccountUtils.parseTag(tag);
                const isValid = AccountUtils_1.AccountUtils.isValidTag(parsedTag);
                if (!isValid) {
                    res.status(400).json({ message: "invalid tag" });
                    return;
                }
                try {
                    const account = yield AccountUtils_1.AccountUtils.getAccount(parsedTag);
                    if (!account) {
                        res
                            .status(400)
                            .json({ message: "account not found or could not be fetched" });
                        return;
                    }
                    if (!(account instanceof Error))
                        yield accountDb.create(account);
                    res.status(200).json(account);
                }
                catch (error) {
                    res.status(500).json({ message: error.message });
                }
                return;
            }
            return account[0];
        }));
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        res.status(200).json(account);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.route("/:tag/update").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = req.params.tag;
    const account = yield accountDb.readByQuery({ "account.tag": tag });
    if (account.length === 0) {
        res.status(404).json({ message: "Account not found" });
        return;
    }
    // updating account steps..
    res.status(200).json(account[0]);
}));
router.route("/updateAll").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const accounts = yield accountDb.readAll();
    if (accounts.length === 0) {
        res.status(404).json({ message: "No accounts found" });
        return;
    }
    try {
        for (var _d = true, accounts_1 = __asyncValues(accounts), accounts_1_1; accounts_1_1 = yield accounts_1.next(), _a = accounts_1_1.done, !_a; _d = true) {
            _c = accounts_1_1.value;
            _d = false;
            const account = _c;
            try {
                yield AccountUtils_1.AccountUtils.updateAccount(account.account.tag);
                //   await accountDb.update(account._id, {});
            }
            catch (error) {
                console.log(error);
                continue;
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
    res.status(200).json({ message: "All accounts updated" });
}));
