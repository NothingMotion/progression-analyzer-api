"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropChancesModel = void 0;
const mongoose_1 = require("mongoose");
const dropChancesSchema = new mongoose_1.Schema({
    boxType: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    commonChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    rareChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    superRareChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    epicChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    mythicChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    legendaryChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    chromaricChance: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.DropChancesModel = (0, mongoose_1.model)("DropChances", dropChancesSchema);
