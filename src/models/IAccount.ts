import { Document } from "mongoose";

interface IBrawler extends Document {
  id: number;
  name: string;
  trophies: number;
  highestTrophies: number;
  rank: number;
  power: number;
  gears?: {
    id: number;
    name: string;
    level: number;
  }[];
  starPowers?: {
    id: number;
    name: string;
    unlocked: boolean;
  }[];
  gadgets?: {
    id: number;
    name: string;
    unlocked: boolean;
  }[];
  mastery?: {
    level: number;
    progress: number;
  };
  masteryProgress?: number;
  masteryLevel?: number;
  masteryTitle?: string;
}

interface IAccount extends Document {
  tag: string;
  name: string;
  icon: {
    id: number;
    url: string;
  };
  level: number;
  trophies: number;
  highestTrophies: number;
  soloVictories: number;
  duoVictories: number;
  trioVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  brawlers: IBrawler[];
  club?: {
    tag: string;
    name: string;
    role: string;
    trophies: number;
    requiredTrophies: number;
    members: number;
    description: string;
  };
  history: IAccount[];
  createdAt: Date;
  updatedAt: Date;
}

interface ICurrentProgress extends Document {
  spentCoins: number;
  spentPowerPoints: number;
  spentCredits: number;
  totalGadgets: number;
  totalStarPowers: number;
  totalGears: number;
  totalBrawlers: number;
  totalMasteryPoints: number;
  totalMasteryLevels: number;
  totalMasteryTitles: number;
  totalBrawlerPower: number;
  averageBrawlerPower: number;
  averageBrawlerTrophies: number;
  isBoughtPass: boolean;
  isBoughtPassPlus: boolean;
  isBoughtRankedPass: boolean;
}

interface IFutureProgress extends Document {
  predictCoins: number;
  predictPowerPoints: number;
  predictCredits: number;
  predictGears: number;
  predictStarPowers: number;
  predictBrawlers: number;
  predictTrophies: number;
  predictedMasteryPoints: number;
  predictedMasteryLevels: number;
  predictedMasteryTitles: number;
  isBoughtPass: boolean;
  isBoughtPassPlus: boolean;
  isBoughtRankedPass: boolean;
  duration: Date;
}

interface BrawlStarsAccount extends Document {
  _id: string;
  account: IAccount;
  currentProgress: ICurrentProgress;
  futureProgresses: IFutureProgress[];
  createdAt: Date;
  updatedAt: Date;
}
