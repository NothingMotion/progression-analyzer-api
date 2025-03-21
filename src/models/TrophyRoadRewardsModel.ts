import { model, Schema } from "mongoose";
import {
  ITrophyRoadRewards,
  ITrophyRoadReward,
} from "../types/ITrophyRoadRewards";

const trophyRoadRewardSchema: Schema = new Schema<ITrophyRoadReward>({
  milestone: { type: Number, required: true },
  resource: {
    name: { type: String, required: false },
    amount: { type: Number, required: false },
    rarity: { type: String, required: false },
    level: { type: Number, required: false },
  },
});

const trophyRoadRewardsSchema: Schema = new Schema<ITrophyRoadRewards>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rewards: [trophyRoadRewardSchema],
  },
  { timestamps: true },
);

const TrophyRoadRewardsModel = model<ITrophyRoadRewards>(
  "TrophyRoadRewards",
  trophyRoadRewardsSchema,
);

export { TrophyRoadRewardsModel };
