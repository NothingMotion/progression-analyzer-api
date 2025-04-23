import { Schema, model } from "mongoose";
import { Battle, LeagueRank } from "../types/IBattle";

const leagueRankSchema = new Schema<LeagueRank>({
  league: {
    type: String,
    enum: [
      "Bronze",
      "Silver",
      "Gold",
      "Diamond",
      "Mythic",
      "Legendary",
      "Masters",
    ],
    required: false,
    default: "Bronze",
  },
  leagueSub: {
    type: String,
    enum: ["I", "II", "III"],
    required: false,
    default: "I",
  },
  formatted: {
    type: String,
    required: false,
    default: "Bronze I",
  },
});

const battleSchema = new Schema<Battle>(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    ranked: {
      type: Boolean,
      required: false,
    },
    event: {
      id: { type: Number, required: true },
      mode: { type: String, required: false, default: "" },
      map: { type: String, required: true },
    },
    result: {
      type: String,
      required: false,
    },
    victory: {
      type: Boolean,
      required: false,
      default: false,
    },
    trophyChange: {
      type: Number,
      required: false,
    },
    teams: [
      [
        {
          tag: { type: String, required: true },
          name: { type: String, required: true, default: "" },
          brawler: { type: String, required: true, default: "" },
          brawlerTrophies: { type: Number, required: true, default: 0 },
          brawlerRank: { type: leagueRankSchema, required: false, default: {} },
          isBigbrawler: { type: Boolean, required: false, default: false },
        },
      ],
    ],
  },
  { timestamps: true },
);

// Create compound index on timestamp and team tags to identify unique battles
battleSchema.index({ timestamp: 1, "teams.tag": 1 }, { unique: true });

const BattleModel = model<Battle>("Battle", battleSchema);

export { BattleModel };
