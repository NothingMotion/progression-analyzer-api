import { model, Schema } from "mongoose";
import {
  BrawlStarsAccount,
  IAccount,
  ICurrentProgress,
  IFutureProgress,
} from "./../types/IAccount";

const currentProgressSchema: Schema = new Schema<ICurrentProgress>({
  coins: { type: Number, required: true, default: 0 },
  powerPoints: { type: Number, required: true, default: 0 },
  credits: { type: Number, required: true, default: 0 },
  gears: { type: Number, required: true, default: 0 },
  gadgets: { type: Number, required: true, default: 0 },
  starPowers: { type: Number, required: true, default: 0 },
  brawlers: { type: Number, required: true, default: 0 },
  averageBrawlerPower: { type: Number, required: true, default: 0 },
  averageBrawlerTrophies: { type: Number, required: true, default: 0 },
  isBoughtPass: { type: Boolean, required: true, default: false },
  isBoughtPassPlus: { type: Boolean, required: true, default: false },
  isBoughtRankedPass: { type: Boolean, required: true, default: false },
  duration: { type: Date, required: true, default: Date.now },
});

const futureProgressSchema: Schema = new Schema<IFutureProgress>({
  coins: { type: Number, required: true },
  powerPoints: { type: Number, required: true },
  credits: { type: Number, required: true },
  gears: { type: Number, required: true },
  gadgets: { type: Number, required: true },
  starPowers: { type: Number, required: true },
  brawlers: { type: Number, required: true },
  isBoughtPass: { type: Boolean, required: true },
  isBoughtPassPlus: { type: Boolean, required: true },
  isBoughtRankedPass: { type: Boolean, required: true },
  duration: { type: Date, required: true },
});
const accountSchema: Schema = new Schema<IAccount>(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      id: {
        type: Number,
        required: false,
      },
    },
    expLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    expPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    trophies: {
      type: Number,
      required: true,
      default: 0,
    },
    highestTrophies: {
      type: Number,
      required: true,
      default: 0,
    },
    soloVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    duoVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    trioVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    bestRoboRumbleTime: {
      type: Number,
      required: true,
      default: 0,
    },
    bestTimeAsBigBrawler: {
      type: Number,
      required: true,
      default: 0,
    },
    brawlers: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        trophies: { type: Number, required: true },
        highestTrophies: { type: Number, required: true },
        rank: { type: Number, required: true },
        power: { type: Number, required: true },
        gears: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // level: { type: Number, required: true },
          },
        ],
        starPowers: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // unlocked: { type: Boolean, required: true },
          },
        ],
        gadgets: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // unlocked: { type: Boolean, required: true },
          },
        ],
        masteryPoints: { type: Number, required: false },
      },
    ],
    rank: {
      points: { type: Number, required: false },
      league: { type: String, required: false },
      leagueSub: { type: String, required: false },
      formatted: { type: String, required: false },
    },
    highestRank: {
      points: { type: Number, required: false },
      league: { type: String, required: false },
      leagueSub: { type: String, required: false },
      formatted: { type: String, required: false },
    },

    club: {
      tag: {
        type: String,
        required: false,
        default: "",
      },
      name: {
        type: String,
        required: false,
        default: "",
      },
    },
  },
  { timestamps: true },
);

const historySchema: Schema = new Schema(
  {
    accountId: {
      type: String,
      ref: "Account",
      required: true,
    },
    // tag: {
    //   type: String,
    //   required: true,
    //   unique: false,
    // },
    name: {
      type: String,
      required: true,
    },
    icon: {
      id: {
        type: Number,
        required: false,
      },
    },
    expLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    expPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    trophies: {
      type: Number,
      required: true,
      default: 0,
    },
    highestTrophies: {
      type: Number,
      required: true,
      default: 0,
    },
    soloVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    duoVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    trioVictories: {
      type: Number,
      required: true,
      default: 0,
    },
    bestRoboRumbleTime: {
      type: Number,
      required: true,
      default: 0,
    },
    bestTimeAsBigBrawler: {
      type: Number,
      required: true,
      default: 0,
    },
    brawlers: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        trophies: { type: Number, required: true },
        highestTrophies: { type: Number, required: true },
        rank: { type: Number, required: true },
        power: { type: Number, required: true },
        gears: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // level: { type: Number, required: true },
          },
        ],
        starPowers: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // unlocked: { type: Boolean, required: true },
          },
        ],
        gadgets: [
          {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            // unlocked: { type: Boolean, required: true },
          },
        ],
        masteryPoints: { type: Number, required: false },
      },
    ],
    rank: {
      points: { type: Number, required: false },
      league: { type: String, required: false },
      leagueSub: { type: String, required: false },
      formatted: { type: String, required: false },
    },
    highestRank: {
      points: { type: Number, required: false },
      league: { type: String, required: false },
      leagueSub: { type: String, required: false },
      formatted: { type: String, required: false },
    },

    club: {
      tag: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true },
);

const brawlStarsAccountSchema: Schema = new Schema<BrawlStarsAccount>(
  {
    account: accountSchema,

    previousProgresses: [
      {
        type: currentProgressSchema,
        required: true,
        default: [],
      },
    ],
    currentProgress: {
      type: currentProgressSchema,
      required: false,
      default: {
        coins: 0,
        powerPoints: 0,
        credits: 0,
        gears: 0,
        gadgets: 0,
        starPowers: 0,
        brawlers: 0,
        averageBrawlerPower: 0,
        averageBrawlerTrophies: 0,
        isBoughtPass: false,
        isBoughtPassPlus: false,
        isBoughtRankedPass: false,
        duration: new Date(),
      },
    },
    futureProgresses: [
      {
        type: futureProgressSchema,
        required: true,
        default: [],
      },
    ],
  },

  { timestamps: true },
);
accountSchema.pre("save", function (next) {
  next();
});
const AccountModel = model<BrawlStarsAccount>(
  "Account",
  brawlStarsAccountSchema,
);

const HistoryModel = model<BrawlStarsAccount>("History", historySchema);
export { AccountModel, HistoryModel };
