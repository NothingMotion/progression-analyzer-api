"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlPassFreeRewardsModel = exports.RankedProPassRewardsModel = exports.RankedPassRewardsModel = exports.BrawlPassPlusRewardsModel = exports.BrawlPassRewardsModel = void 0;
const mongoose_1 = require("mongoose");
// Base resource schema
const resourceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    rarity: { type: String, required: false },
    level: { type: Number, required: false },
}, { _id: false });
// Base schema for all pass rewards
const passRewardsSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    resources: [resourceSchema],
}, { timestamps: true, discriminatorKey: "passType" });
// Create the base model
const PassRewardsModel = (0, mongoose_1.model)("PassRewards", passRewardsSchema);
const BrawlPassFreeRewardsModel = PassRewardsModel.discriminator("BrawlPassFree", new mongoose_1.Schema({}, { timestamps: true }));
exports.BrawlPassFreeRewardsModel = BrawlPassFreeRewardsModel;
// Create the models for specific pass types using discriminators
const BrawlPassRewardsModel = PassRewardsModel.discriminator("BrawlPass", new mongoose_1.Schema({}, { timestamps: true }));
exports.BrawlPassRewardsModel = BrawlPassRewardsModel;
const BrawlPassPlusRewardsModel = PassRewardsModel.discriminator("BrawlPassPlus", new mongoose_1.Schema({}, { timestamps: true }));
exports.BrawlPassPlusRewardsModel = BrawlPassPlusRewardsModel;
const RankedPassRewardsModel = PassRewardsModel.discriminator("RankedPass", new mongoose_1.Schema({}, { timestamps: true }));
exports.RankedPassRewardsModel = RankedPassRewardsModel;
const RankedProPassRewardsModel = PassRewardsModel.discriminator("RankedProPass", new mongoose_1.Schema({}, { timestamps: true }));
exports.RankedProPassRewardsModel = RankedProPassRewardsModel;
