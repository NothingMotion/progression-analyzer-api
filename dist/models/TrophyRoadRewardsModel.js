"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrophyRoadRewardsModel = void 0;
const mongoose_1 = require("mongoose");
const trophyRoadRewardSchema = new mongoose_1.Schema({
    milestone: { type: Number, required: true },
    resource: {
        name: { type: String, required: false },
        amount: { type: Number, required: false },
        rarity: { type: String, required: false },
        level: { type: Number, required: false },
    },
});
const trophyRoadRewardsSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rewards: [trophyRoadRewardSchema],
}, { timestamps: true });
const TrophyRoadRewardsModel = (0, mongoose_1.model)("TrophyRoadRewards", trophyRoadRewardsSchema);
exports.TrophyRoadRewardsModel = TrophyRoadRewardsModel;
