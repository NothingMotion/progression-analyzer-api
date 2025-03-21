import { model, Schema } from "mongoose";
import { IMasteryRewards } from "../types/IMasteryRewards";
import { IRarity } from "../types/IRarity";

// Define the interface locally since it's not exported from the types file
interface IMasteryLevelRewards {
  level: number;
  type: string;
  resource: {
    name: string;
    amount: number;
    rarity?: string;
  };
}

const masteryLevelRewardsSchema: Schema = new Schema<IMasteryLevelRewards>({
  level: { type: Number, required: true },
  type: { type: String, required: true },
  resource: {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    rarity: { type: String, required: false },
  },
});

const masteryRewardsSchema: Schema = new Schema<IMasteryRewards>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brawlerRarity: {
      type: String,
      enum: ["Common", "Rare", "SuperRare", "Epic", "Mythic", "Legendary"],
      required: true,
    },
    rewards: [masteryLevelRewardsSchema],
  },
  { timestamps: true },
);

const MasteryRewardsModel = model<IMasteryRewards>(
  "MasteryRewards",
  masteryRewardsSchema,
);

export { MasteryRewardsModel };
