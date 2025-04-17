"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModel = exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const currentProgressSchema = new mongoose_1.Schema({
    coins: { type: Number, required: true },
    powerPoints: { type: Number, required: true },
    credits: { type: Number, required: true },
    gears: { type: Number, required: true },
    starPowers: { type: Number, required: true },
    brawlers: { type: Number, required: true },
    averageBrawlerPower: { type: Number, required: true },
    averageBrawlerTrophies: { type: Number, required: true },
    isBoughtPass: { type: Boolean, required: true },
    isBoughtPassPlus: { type: Boolean, required: true },
    isBoughtRankedPass: { type: Boolean, required: true },
    duration: { type: Date, required: true },
});
const futureProgressSchema = new mongoose_1.Schema({
    coins: { type: Number, required: true },
    powerPoints: { type: Number, required: true },
    credits: { type: Number, required: true },
    gears: { type: Number, required: true },
    starPowers: { type: Number, required: true },
    brawlers: { type: Number, required: true },
    isBoughtPass: { type: Boolean, required: true },
    isBoughtPassPlus: { type: Boolean, required: true },
    isBoughtRankedPass: { type: Boolean, required: true },
    duration: { type: Date, required: true },
});
const accountSchema = new mongoose_1.Schema({
    tag: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        id: {
            type: Number,
            required: false,
        },
    },
    expLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    expPoints: {
        type: Number,
        required: true,
        default: 0,
    },
    trophies: {
        type: Number,
        required: true,
        default: 0,
    },
    highestTrophies: {
        type: Number,
        required: true,
        default: 0,
    },
    soloVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    duoVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    trioVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    bestRoboRumbleTime: {
        type: Number,
        required: true,
        default: 0,
    },
    bestTimeAsBigBrawler: {
        type: Number,
        required: true,
        default: 0,
    },
    brawlers: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            trophies: { type: Number, required: true },
            highestTrophies: { type: Number, required: true },
            rank: { type: Number, required: true },
            power: { type: Number, required: true },
            gears: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    level: { type: Number, required: true },
                },
            ],
            starPowers: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    unlocked: { type: Boolean, required: true },
                },
            ],
            gadgets: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    unlocked: { type: Boolean, required: true },
                },
            ],
            masteryPoints: { type: Number, required: false },
        },
    ],
    rank: {
        points: { type: Number, required: false },
        league: { type: String, required: false },
        leagueSub: { type: String, required: false },
        formatted: { type: String, required: false },
    },
    highestRank: {
        points: { type: Number, required: false },
        league: { type: String, required: false },
        leagueSub: { type: String, required: false },
        formatted: { type: String, required: false },
    },
    club: {
        tag: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });
const historySchema = new mongoose_1.Schema({
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    // tag: {
    //   type: String,
    //   required: true,
    //   unique: false,
    // },
    name: {
        type: String,
        required: true,
    },
    icon: {
        id: {
            type: Number,
            required: false,
        },
    },
    expLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    expPoints: {
        type: Number,
        required: true,
        default: 0,
    },
    trophies: {
        type: Number,
        required: true,
        default: 0,
    },
    highestTrophies: {
        type: Number,
        required: true,
        default: 0,
    },
    soloVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    duoVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    trioVictories: {
        type: Number,
        required: true,
        default: 0,
    },
    bestRoboRumbleTime: {
        type: Number,
        required: true,
        default: 0,
    },
    bestTimeAsBigBrawler: {
        type: Number,
        required: true,
        default: 0,
    },
    brawlers: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            trophies: { type: Number, required: true },
            highestTrophies: { type: Number, required: true },
            rank: { type: Number, required: true },
            power: { type: Number, required: true },
            gears: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    level: { type: Number, required: true },
                },
            ],
            starPowers: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    unlocked: { type: Boolean, required: true },
                },
            ],
            gadgets: [
                {
                    id: { type: Number, required: true },
                    name: { type: String, required: true },
                    unlocked: { type: Boolean, required: true },
                },
            ],
            masteryPoints: { type: Number, required: false },
        },
    ],
    rank: {
        points: { type: Number, required: false },
        league: { type: String, required: false },
        leagueSub: { type: String, required: false },
        formatted: { type: String, required: false },
    },
    highestRank: {
        points: { type: Number, required: false },
        league: { type: String, required: false },
        leagueSub: { type: String, required: false },
        formatted: { type: String, required: false },
    },
    club: {
        tag: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });
const brawlStarsAccountSchema = new mongoose_1.Schema({
    account: accountSchema,
    previousProgresses: [
        {
            type: currentProgressSchema,
            required: true,
        },
    ],
    currentProgress: {
        type: currentProgressSchema,
        required: false,
    },
    futureProgresses: [
        {
            type: futureProgressSchema,
            required: true,
        },
    ],
}, { timestamps: true });
accountSchema.pre("save", function (next) {
    next();
});
const AccountModel = (0, mongoose_1.model)("Account", brawlStarsAccountSchema);
exports.AccountModel = AccountModel;
const HistoryModel = (0, mongoose_1.model)("History", historySchema);
exports.HistoryModel = HistoryModel;
