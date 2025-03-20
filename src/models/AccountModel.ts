import { model, Schema } from "mongoose";
import {
  BrawlStarsAccount,
  ICurrentProgress,
  IFutureProgress,
} from "./../types/IAccount";

const currentProgressSchema: Schema = new Schema<ICurrentProgress>({
  coins: { type: Number, required: true },
  powerPoints: { type: Number, required: true },
  credits: { type: Number, required: true },
  gears: { type: Number, required: true },
  starPowers: { type: Number, required: true },
  brawlers: { type: Number, required: true },
  averageBrawlerPower: { type: Number, required: true },
  averageBrawlerTrophies: { type: Number, required: true },
  isBoughtPass: { type: Boolean, required: true },
  isBoughtPassPlus: { type: Boolean, required: true },
  isBoughtRankedPass: { type: Boolean, required: true },
  duration: { type: Date, required: true },
});

const futureProgressSchema: Schema = new Schema<IFutureProgress>({
  coins: { type: Number, required: true },
  powerPoints: { type: Number, required: true },
  credits: { type: Number, required: true },
  gears: { type: Number, required: true },
  starPowers: { type: Number, required: true },
  brawlers: { type: Number, required: true },
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
accountSchema.pre("save", function (next) {
  next();
});
const AccountModel = model<BrawlStarsAccount>("Account", accountSchema);

export { AccountModel };
