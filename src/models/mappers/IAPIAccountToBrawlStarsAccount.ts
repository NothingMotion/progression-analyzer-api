import {
  ModifiedPathsSnapshot,
  Document,
  Model,
  Types,
  ClientSession,
  DocumentSetOptions,
  QueryOptions,
  MergeType,
  UpdateQuery,
  AnyObject,
  PopulateOptions,
  Query,
  SaveOptions,
  ToObjectOptions,
  FlattenMaps,
  UpdateWithAggregationPipeline,
  pathsToSkip,
  Error,
} from "mongoose";
import {
  BrawlStarsAccount,
  ICurrentProgress,
  IFutureProgress,
} from "../../types/IAccount";
import { IAPIAccount } from "../../types/IAccount";
import { MapperBase } from "./MapperBase";

class IAPIAccountToBrawlStarsAccount extends MapperBase<
  IAPIAccount,
  BrawlStarsAccount
> {
  map(data: IAPIAccount, ...args: any[]): BrawlStarsAccount {
    const currentProgress = args[0] as ICurrentProgress;
    const futureProgresses = args[1] as IFutureProgress[];
    const previousProgresses = args[2] as ICurrentProgress[];
    const history = args[3] as BrawlStarsAccount[];
    const createdAt = args[4] as Date;
    const updatedAt = args[5] as Date;
    return {
      account: {
        tag: data.tag,
        name: data.name,
        icon: data.icon,
        expLevel: data.expLevel || 0,
        expPoints: data.expPoints || 0,
        trophies: data.trophies || 0,
        highestTrophies: data.highestTrophies || 0,
        soloVictories: data.soloVictories || 0,
        duoVictories: data.duoVictories || 0,
        trioVictories: data.trioVictories || 0,
        bestRoboRumbleTime: data.bestRoboRumbleTime || 0,
        bestTimeAsBigBrawler: data.bestTimeAsBigBrawler || 0,

        brawlers: data.brawlers || [],
      },
      history: history || [],
      previousProgresses: previousProgresses || [],
      currentProgress: currentProgress,
      futureProgresses: futureProgresses || [],

      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };
  }
}
export { IAPIAccountToBrawlStarsAccount };
