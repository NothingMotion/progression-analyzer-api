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
    // level: number;
  }[];
  starPowers?: {
    id: number;
    name: string;
    // unlocked: boolean;
  }[];
  gadgets?: {
    id: number;
    name: string;
    // unlocked: boolean;
  }[];
  masteryPoints?: number;
}

interface IAPIAccount {
  tag: string;
  name: string;
  icon: {
    id: number;
    url: string;
  };
  expLevel: number;
  expPoints: number;
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
interface IAccount extends IAPIAccount {
  rank?: {
    points?: number;
    league?: string;
    leagueSub?: string;
    formatted?: string;
  };

  highestRank?: {
    points?: number;
    league?: string;
    leagueSub?: string;
    formatted?: string;
  };
}
interface IProgress {
  coins: number;
  powerPoints: number;
  credits: number;
  gears: number;
  gadgets: number;
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
  _id?: string;
  account: IAccount;
  history: BrawlStarsAccount[];
  previousProgresses: ICurrentProgress[];
  currentProgress: ICurrentProgress;
  futureProgresses: IFutureProgress[];
  createdAt: Date;
  updatedAt: Date;
}

interface IExtraBrawlNinja {
  result: {
    data: {
      json?: {
        rank?: {
          points?: number;
          league?: string;
          leagueSub?: string;
          formatted?: string;
        };
        highestRank?: {
          points?: number;
          league?: string;
          leagueSub?: string;
          formatted?: string;
        };
        accountCreationYear?: number;
        brawlers?: { [key: string]: { masteryPoints: number } };
      };
    };
  };
}
export {
  IAPIAccount,
  ICurrentProgress,
  IFutureProgress,
  BrawlStarsAccount,
  IBrawler,
  IProgress,
  IAccount,
  IExtraBrawlNinja,
};
