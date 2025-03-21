import { model, Schema } from "mongoose";
import {
  IBrawlPassRewards,
  IBrawlPassPlusRewards,
  IRankedPassRewards,
  IRankedProPassRewards,
} from "../types/IRewards";

// Base resource schema
const resourceSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    rarity: { type: String, required: false },
    level: { type: Number, required: false },
  },
  { _id: false },
);

// Base schema for all pass rewards
const passRewardsSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    resources: [resourceSchema],
  },
  { timestamps: true, discriminatorKey: "passType" },
);

// Create the base model
const PassRewardsModel = model("PassRewards", passRewardsSchema);

const BrawlPassFreeRewardsModel =
  PassRewardsModel.discriminator<IBrawlPassRewards>(
    "BrawlPassFree",
    new Schema({}, { timestamps: true }),
  );

// Create the models for specific pass types using discriminators
const BrawlPassRewardsModel = PassRewardsModel.discriminator<IBrawlPassRewards>(
  "BrawlPass",
  new Schema({}, { timestamps: true }),
);

const BrawlPassPlusRewardsModel =
  PassRewardsModel.discriminator<IBrawlPassPlusRewards>(
    "BrawlPassPlus",
    new Schema({}, { timestamps: true }),
  );

const RankedPassRewardsModel =
  PassRewardsModel.discriminator<IRankedPassRewards>(
    "RankedPass",
    new Schema({}, { timestamps: true }),
  );

const RankedProPassRewardsModel =
  PassRewardsModel.discriminator<IRankedProPassRewards>(
    "RankedProPass",
    new Schema({}, { timestamps: true }),
  );

export {
  BrawlPassRewardsModel,
  BrawlPassPlusRewardsModel,
  RankedPassRewardsModel,
  RankedProPassRewardsModel,
  BrawlPassFreeRewardsModel,
};
