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
exports.AccountUtils = void 0;
const constants_1 = require("../constants/constants");
const AccountModel_1 = require("../models/AccountModel");
class AccountUtils {
    static isValidTag(tag) {
        return constants_1.ACCOUNT_TAG_REGEX.test(tag);
    }
    static parseTag(tag) {
        return tag.replace("#", "").trim().toUpperCase();
    }
    static getAccount(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield constants_1.BrawlStarsAPI.get(tag);
                const mapper = new IAPIAccountToBrawlStarsAccount();
                // step 2: calculating the progress
                // step 3: calculating the future progress
                // step 4: calculating the previous progress
                //
                return mapper.map(account);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateAccount(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedAccount = yield AccountModel_1.AccountModel.findOne({
                    "account.tag": tag,
                });
                if (!savedAccount) {
                    throw new Error("Account not found");
                }
                const account = yield constants_1.BrawlStarsAPI.get(tag);
                const mapper = new IAPIAccountToBrawlStarsAccount();
                const mappedNewData = mapper.map(account, savedAccount.currentProgress, savedAccount.futureProgresses, savedAccount.previousProgresses, savedAccount.history, savedAccount.createdAt, savedAccount.updatedAt);
                savedAccount.history.push(savedAccount);
                savedAccount.account = mappedNewData.account;
                yield savedAccount.save();
                return savedAccount;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AccountUtils = AccountUtils;
