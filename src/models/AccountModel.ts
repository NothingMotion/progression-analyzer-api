import { model, Schema } from "mongoose";
import {
  BrawlStarsAccount,
  ICurrentProgress,
  IFutureProgress,
} from "./../types/IAccount";

const currentProgressSchema: Schema = new Schema<ICurrentProgress>({
  spentCoins: { type: Number, required: true },
  spentPowerPoints: { type: Number, required: true },
  spentCredits: { type: Number, required: true },
  totalGadgets: { type: Number, required: true },
  totalStarPowers: { type: Number, required: true },
  totalGears: { type: Number, required: true },
  totalBrawlers: { type: Number, required: true },
  totalMasteryPoints: { type: Number, required: true },
  totalMasteryLevels: { type: Number, required: true },
  totalMasteryTitles: { type: Number, required: true },
  totalBrawlerPower: { type: Number, required: true },
  averageBrawlerPower: { type: Number, required: true },
  averageBrawlerTrophies: { type: Number, required: true },
  isBoughtPass: { type: Boolean, required: true },
  isBoughtPassPlus: { type: Boolean, required: true },
  isBoughtRankedPass: { type: Boolean, required: true },
});

const futureProgressSchema: Schema = new Schema<IFutureProgress>({
  predictCoins: { type: Number, required: true },
  predictPowerPoints: { type: Number, required: true },
  predictCredits: { type: Number, required: true },
  predictGears: { type: Number, required: true },
  predictStarPowers: { type: Number, required: true },
  predictBrawlers: { type: Number, required: true },
  predictTrophies: { type: Number, required: true },
  predictedMasteryPoints: { type: Number, required: true },
  predictedMasteryLevels: { type: Number, required: true },
  predictedMasteryTitles: { type: Number, required: true },
  isBoughtPass: { type: Boolean, required: true },
  isBoughtPassPlus: { type: Boolean, required: true },
  isBoughtRankedPass: { type: Boolean, required: true },
  duration: { type: Date, required: true },
});

const accountSchema: Schema = new Schema<BrawlStarsAccount>(
  {
    account: {
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
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      level: {
        type: Number,
        required: true,
      },
      trophies: {
        type: Number,
        required: true,
      },
      highestTrophies: {
        type: Number,
        required: true,
      },
      soloVictories: {
        type: Number,
        required: true,
      },
      duoVictories: {
        type: Number,
        required: true,
      },
      trioVictories: {
        type: Number,
        required: true,
      },
      bestRoboRumbleTime: {
        type: Number,
        required: true,
      },
      bestTimeAsBigBrawler: {
        type: Number,
        required: true,
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
              level: { type: Number, required: true },
            },
          ],
          starPowers: [
            {
              id: { type: Number, required: true },
              name: { type: String, required: true },
              unlocked: { type: Boolean, required: true },
            },
          ],
          gadgets: [
            {
              id: { type: Number, required: true },
              name: { type: String, required: true },
              unlocked: { type: Boolean, required: true },
            },
          ],
          mastery: {
            level: { type: Number, required: true },
            progress: { type: Number, required: true },
          },
          masteryProgress: { type: Number },
          masteryLevel: { type: Number },
          masteryTitle: { type: String },
        },
      ],
      club: {
        tag: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      history: [
        {
          type: Schema.Types.ObjectId,
          ref: "Account",
          required: false,
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },

    previousProgresses: [
      {
        type: currentProgressSchema,
        required: true,
      },
    ],
    currentProgress: {
      type: currentProgressSchema,
      required: true,
    },
    futureProgresses: [
      {
        type: futureProgressSchema,
        required: true,
      },
    ],
  },

  { timestamps: true },
);

const AccountModel = model<BrawlStarsAccount>("Account", accountSchema);

export { AccountModel };
