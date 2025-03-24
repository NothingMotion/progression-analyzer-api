"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasteryRewardsModel = void 0;
const mongoose_1 = require("mongoose");
const masteryLevelRewardsSchema = new mongoose_1.Schema({
    level: { type: Number, required: true },
    type: { type: String, required: true },
    resource: {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        rarity: { type: String, required: false },
    },
});
const masteryRewardsSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brawlerRarity: {
        type: String,
        enum: ["Common", "Rare", "SuperRare", "Epic", "Mythic", "Legendary"],
        required: true,
    },
    rewards: [masteryLevelRewardsSchema],
}, { timestamps: true });
const MasteryRewardsModel = (0, mongoose_1.model)("MasteryRewards", masteryRewardsSchema);
exports.MasteryRewardsModel = MasteryRewardsModel;
