"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarrDropRewardsModel = void 0;
const mongoose_1 = require("mongoose");
const starrDropRewardSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    resource: {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        rarity: { type: String, required: false },
    },
    chance: { type: Number, required: true },
});
const starrDropRewardsSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rarity: {
        type: String,
        enum: ["Common", "Rare", "SuperRare", "Epic", "Mythic", "Legendary"],
        required: true,
    },
    rewards: [starrDropRewardSchema],
    chanceToDrop: { type: Number, required: true },
}, { timestamps: true });
const StarrDropRewardsModel = (0, mongoose_1.model)("StarrDropRewards", starrDropRewardsSchema);
exports.StarrDropRewardsModel = StarrDropRewardsModel;
