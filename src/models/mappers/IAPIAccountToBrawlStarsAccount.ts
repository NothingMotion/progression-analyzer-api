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
        level: data.level,
        trophies: data.trophies,
        highestTrophies: data.highestTrophies,
        soloVictories: data.soloVictories,
        duoVictories: data.duoVictories,
        trioVictories: data.trioVictories,
        bestRoboRumbleTime: data.bestRoboRumbleTime,
        bestTimeAsBigBrawler: data.bestTimeAsBigBrawler,

        brawlers: data.brawlers,
      },
      history: history,
      previousProgresses: previousProgresses,
      currentProgress: currentProgress,
      futureProgresses: futureProgresses,

      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }
}
