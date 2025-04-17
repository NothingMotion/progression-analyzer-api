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
const BrawlStarsAPI_1 = require("../lib/BrawlStarsAPI");
const AccountModel_1 = require("../models/AccountModel");
const IAPIAccountToBrawlStarsAccount_1 = require("../models/mappers/IAPIAccountToBrawlStarsAccount");
const AccountCalculator_1 = require("./AccountCalculator");
class AccountUtils {
    static isValidTag(tag) {
        return constants_1.ACCOUNT_TAG_REGEX.test(tag);
    }
    static parseTag(tag) {
        return tag.replace("#", "").trim().toUpperCase();
    }
    static convertTag(tag) {
        return "#" + tag.toUpperCase();
    }
    static getAccount(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield constants_1.BrawlStarsAPI.get(tag);
                const extra = yield constants_1.BrawlStarsAPI.getExtra(tag);
                const mapper = new IAPIAccountToBrawlStarsAccount_1.IAPIAccountToBrawlStarsAccount();
                if (account instanceof Error)
                    throw account;
                const bsAccount = mapper.map(account);
                // step 2: calculating the progress
                const cProgress = AccountCalculator_1.AccountCalculator.calculateCurrentProgress(bsAccount, false, false, false);
                bsAccount.currentProgress = cProgress;
                bsAccount.account.rank = {};
                bsAccount.account.highestRank = {};
                if (!(extra instanceof Error)) {
                    const result = extra.result.data.json;
                    if (result) {
                        bsAccount.account.rank = result.rank;
                        bsAccount.account.highestRank = result.highestRank;
                        if (result.brawlers) {
                            for (const key of Object.keys(result.brawlers)) {
                                const brawler = bsAccount.account.brawlers.find((b) => b.name === this.parseExtraBrawlerName(key));
                                if (brawler) {
                                    brawler.masteryPoints = result.brawlers[key].masteryPoints;
                                }
                            }
                        }
                    }
                }
                // step 3: calculating the future progress
                // step 4: calculating the previous progress
                //
                return bsAccount;
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
                    throw BrawlStarsAPI_1.BrawlStarsAPIError.AccountNotFound("Account not found");
                }
                const parsedTag = AccountUtils.parseTag(tag);
                const account = yield constants_1.BrawlStarsAPI.get(parsedTag);
                const extra = yield constants_1.BrawlStarsAPI.getExtra(parsedTag);
                if (account instanceof Error || !account)
                    throw account;
                const mapper = new IAPIAccountToBrawlStarsAccount_1.IAPIAccountToBrawlStarsAccount();
                const mappedNewData = mapper.map(account, savedAccount.currentProgress, savedAccount.futureProgresses, savedAccount.previousProgresses, savedAccount.history, savedAccount.createdAt, savedAccount.updatedAt);
                // Initialize history array if it doesn't exist
                if (!savedAccount.history) {
                    savedAccount.history = [];
                }
                // Create a history entry with the required fields
                const historyEntry = {
                    accountId: savedAccount._id,
                    name: savedAccount.account.name,
                    // Include other required fields from the savedAccount
                    expLevel: savedAccount.account.expLevel || 0,
                    expPoints: savedAccount.account.expPoints || 0,
                    trophies: savedAccount.account.trophies || 0,
                    highestTrophies: savedAccount.account.highestTrophies || 0,
                    soloVictories: savedAccount.account.soloVictories || 0,
                    duoVictories: savedAccount.account.duoVictories || 0,
                    trioVictories: savedAccount.account.trioVictories || 0,
                    bestRoboRumbleTime: savedAccount.account.bestRoboRumbleTime || 0,
                    bestTimeAsBigBrawler: savedAccount.account.bestTimeAsBigBrawler || 0,
                    brawlers: savedAccount.account.brawlers || [],
                    club: savedAccount.account.club || {},
                    rank: savedAccount.account.rank || {},
                    highestRank: savedAccount.account.highestRank || {},
                    icon: savedAccount.account.icon || {},
                };
                // Save the history entry
                const history = yield AccountModel_1.HistoryModel.create(historyEntry);
                // savedAccount.history.push(history);
                savedAccount.account = mappedNewData.account;
                // Initialize previousProgresses array if it doesn't exist
                if (!savedAccount.previousProgresses) {
                    savedAccount.previousProgresses = [];
                }
                if (savedAccount.currentProgress) {
                    savedAccount.previousProgresses.push(savedAccount.currentProgress);
                }
                const cProgress = AccountCalculator_1.AccountCalculator.calculateCurrentProgress(mappedNewData, false, false, false);
                savedAccount.currentProgress = cProgress;
                if (!(extra instanceof Error)) {
                    const result = extra.result.data.json;
                    if (result) {
                        savedAccount.account.rank = result.rank;
                        savedAccount.account.highestRank = result.highestRank;
                        if (result.brawlers) {
                            for (const key of Object.keys(result.brawlers)) {
                                const brawler = savedAccount.account.brawlers.find((b) => b.name === this.parseExtraBrawlerName(key));
                                if (brawler && result.brawlers) {
                                    brawler.masteryPoints = result.brawlers[key].masteryPoints;
                                }
                            }
                        }
                    }
                }
                yield savedAccount.save();
                return savedAccount;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static parseExtraBrawlerName(name) {
        return name.replace(" ", "").replace("-", "").replace("_", "");
    }
}
exports.AccountUtils = AccountUtils;
