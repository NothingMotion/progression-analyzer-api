import { model, Schema } from "mongoose";
import {
  IStarrDropRewards,
  IStarrDropReward,
} from "../types/IStarrDropRewards";

const starrDropRewardSchema: Schema = new Schema<IStarrDropReward>({
  type: { type: String, required: true },
  resource: {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    rarity: { type: String, required: false },
  },
  chance: { type: Number, required: true },
});

const starrDropRewardsSchema: Schema = new Schema<IStarrDropRewards>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rarity: {
      type: String,
      enum: ["Common", "Rare", "SuperRare", "Epic", "Mythic", "Legendary"],
      required: true,
    },
    rewards: [starrDropRewardSchema],
    chanceToDrop: { type: Number, required: true },
  },
  { timestamps: true },
);

const StarrDropRewardsModel = model<IStarrDropRewards>(
  "StarrDropRewards",
  starrDropRewardsSchema,
);

export { StarrDropRewardsModel };
