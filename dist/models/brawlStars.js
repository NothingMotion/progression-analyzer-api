"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlStarsAccountModel = void 0;
const mongoose_1 = require("mongoose");
const BrawlerSchema = new mongoose_1.Schema({
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
    mastery: {
        level: { type: Number, required: true },
        progress: { type: Number, required: true },
    },
    masteryProgress: { type: Number },
    masteryLevel: { type: Number },
    masteryTitle: { type: String },
});
const APIAccountSchema = new mongoose_1.Schema({
    tag: { type: String, required: true },
    name: { type: String, required: true },
    icon: {
        id: { type: Number, required: true },
        url: { type: String, required: true },
    },
    level: { type: Number, required: true },
    trophies: { type: Number, required: true },
    highestTrophies: { type: Number, required: true },
    soloVictories: { type: Number, required: true },
    duoVictories: { type: Number, required: true },
    trioVictories: { type: Number, required: true },
    bestRoboRumbleTime: { type: Number, required: true },
    bestTimeAsBigBrawler: { type: Number, required: true },
    brawlers: [BrawlerSchema],
    club: {
        tag: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        trophies: { type: Number, required: true },
        requiredTrophies: { type: Number, required: true },
        members: { type: Number, required: true },
        description: { type: String, required: true },
    },
});
const AccountSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, APIAccountSchema.obj), { history: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Account" }], createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now } }));
const CurrentProgressSchema = new mongoose_1.Schema({
    spentCoins: { type: Number, required: true },
    spentPowerPoints: { type: Number, required: true },
    spentCredits: { type: Number, required: true },
    totalGadgets: { type: Number, required: true },
    totalStarPowers: { type: Number, required: true },
    totalGears: { type: Number, required: true },
    totalBrawlers: { type: Number, required: true },
    totalMasteryPoints: { type: Number, required: true },
    totalMasteryLevels: { type: Number, required: true },
    totalMasteryTitles: { type: Number, required: true },
    totalBrawlerPower: { type: Number, required: true },
    averageBrawlerPower: { type: Number, required: true },
    averageBrawlerTrophies: { type: Number, required: true },
    isBoughtPass: { type: Boolean, required: true },
    isBoughtPassPlus: { type: Boolean, required: true },
    isBoughtRankedPass: { type: Boolean, required: true },
});
const FutureProgressSchema = new mongoose_1.Schema({
    predictCoins: { type: Number, required: true },
    predictPowerPoints: { type: Number, required: true },
    predictCredits: { type: Number, required: true },
    predictGears: { type: Number, required: true },
    predictStarPowers: { type: Number, required: true },
    predictBrawlers: { type: Number, required: true },
    predictTrophies: { type: Number, required: true },
    predictedMasteryPoints: { type: Number, required: true },
    predictedMasteryLevels: { type: Number, required: true },
    predictedMasteryTitles: { type: Number, required: true },
    isBoughtPass: { type: Boolean, required: true },
    isBoughtPassPlus: { type: Boolean, required: true },
    isBoughtRankedPass: { type: Boolean, required: true },
    duration: { type: Date, required: true },
});
const BrawlStarsAccountSchema = new mongoose_1.Schema({
    account: { type: AccountSchema, required: true },
    previousProgresses: [{ type: CurrentProgressSchema }],
    currentProgress: { type: CurrentProgressSchema, required: true },
    futureProgresses: [{ type: FutureProgressSchema }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.BrawlStarsAccountModel = (0, mongoose_1.model)("BrawlStarsAccount", BrawlStarsAccountSchema);
