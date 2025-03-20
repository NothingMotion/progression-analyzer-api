"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    playerTag: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    trophies: {
        type: Number,
        required: true,
    },
    highestTrophies: {
        type: Number,
        required: true,
    },
    powerPlayPoints: {
        type: Number,
        default: 0,
    },
    expLevel: {
        type: Number,
        required: true,
    },
    expPoints: {
        type: Number,
        required: true,
    },
    isQualifiedFromChampionshipChallenge: {
        type: Boolean,
        default: false,
    },
    victories3vs3: {
        type: Number,
        default: 0,
    },
    soloVictories: {
        type: Number,
        default: 0,
    },
    duoVictories: {
        type: Number,
        default: 0,
    },
    bestRoboRumbleTime: {
        type: Number,
        default: 0,
    },
    bestTimeAsBigBrawler: {
        type: Number,
        default: 0,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.AccountModel = (0, mongoose_1.model)("Account", accountSchema);
