import { Document } from "mongoose";

interface IBrawler {
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

interface IAPIAccount {
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
  };
}

interface IProgress {
  coins: number;
  powerPoints: number;
  credits: number;
  gears: number;
  starPowers: number;
  brawlers: number;
  averageBrawlerPower: number;
  averageBrawlerTrophies: number;
  isBoughtPass: boolean;
  isBoughtPassPlus: boolean;
  isBoughtRankedPass: boolean;
  duration: Date;
}
interface ICurrentProgress extends IProgress {}

interface IFutureProgress extends IProgress {}

interface BrawlStarsAccount {
  account: IAPIAccount;
  history: BrawlStarsAccount[];
  previousProgresses: ICurrentProgress[];
  currentProgress: ICurrentProgress;
  futureProgresses: IFutureProgress[];
  createdAt: Date;
  updatedAt: Date;
}

export {
  IAPIAccount,
  ICurrentProgress,
  IFutureProgress,
  BrawlStarsAccount,
  IBrawler,
};
