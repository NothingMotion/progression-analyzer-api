import { Request, Response } from "express";
import { Battle } from "../types/IBattle";
import { ControllerBase } from "./ControllerBase";
import CrudDBBase from "./CrudDBBase";
import { BattleModel } from "../models/BattleModel";
import Logger from "../lib/Logger";
import { BrawlStarsAPI } from "../constants/constants";
import { AccountUtils } from "../utils/AccountUtils";

class BattleController extends ControllerBase<Battle> {
  constructor() {
    super(new CrudDBBase<Battle>(BattleModel));
  }

  protected override isMatch(data: any): data is Battle {
    return (
      data &&
      typeof data === "object" &&
      "timestamp" in data &&
      "event" in data &&
      "teams" in data
    );
  }

  override async getById(req: Request, res: Response): Promise<void> {
    try {
      const tag = req.params.id;
      const converted = AccountUtils.convertTag(tag);

      if (!converted || !AccountUtils.isValidTag(converted)) {
        this.sendErrorResponse(res, new Error("Invalid tag format"), 400);
        return;
      }
      const parsed = AccountUtils.parseTag(converted);

      const battles = await this.crudDB.readByQuery({
        teams: {
          $elemMatch: {
            $elemMatch: {
              tag: parsed,
            },
          },
        },
      });

      if (!battles || battles.length === 0) {
        const battles = await BrawlStarsAPI.getBattleLog(parsed);
        if (!battles || battles.length === 0) {
          this.sendErrorResponse(res, new Error("No battles found"), 404);
          return;
        }
        if (this.isAlreadyExists(battles)) {
          this.sendErrorResponse(res, new Error("Already exists"), 409);
          return;
        }
        const parsedBattles = await this.crudDB.getModel().insertMany(battles);

        this.sendSuccessResponse(res, parsedBattles);
        return;
        // this.sendErrorResponse(res, new Error("No battles found"), 404);
        // return;
      } else if (!this.isAlreadyExists(battles)) {
        const battles = await BrawlStarsAPI.getBattleLog(parsed);
        if (!battles || battles.length === 0) {
          this.sendErrorResponse(res, new Error("No battles found"), 404);
          return;
        }

        const parsedBattles = await this.crudDB.getModel().insertMany(battles);

        this.sendSuccessResponse(res, parsedBattles);
        return;
      }

      this.sendSuccessResponse(res, battles);
    } catch (error) {
      Logger.error(`Error fetching battles: ${(error as Error).message}`);
      this.sendErrorResponse(res, error as Error);
    }
  }

  async getByTag(req: Request, res: Response): Promise<void> {
    try {
      const tag = req.params.id;
      const converted = AccountUtils.convertTag(tag);

      if (!converted || !AccountUtils.isValidTag(converted)) {
        this.sendErrorResponse(res, new Error("Invalid tag format"), 400);
        return;
      }
      const parsed = AccountUtils.parseTag(converted);

      const battles = await this.crudDB.readByQuery({
        teams: {
          $elemMatch: {
            $elemMatch: {
              tag: `#${tag.toUpperCase()}`,
            },
          },
        },
      });

      if (!battles || battles.length === 0) {
        const battles = await BrawlStarsAPI.getBattleLog(parsed);
        if (!battles || battles.length === 0) {
          this.sendErrorResponse(res, new Error("No battles found"), 404);
          return;
        }
        if (this.isAlreadyExists(battles)) {
          this.sendErrorResponse(res, new Error("Already exists"), 409);
          return;
        }
        const parsedBattles = await this.crudDB.getModel().insertMany(battles);

        this.sendSuccessResponse(res, parsedBattles);
        return;
      } else if (!this.isAlreadyExists(battles)) {
        const battles = await BrawlStarsAPI.getBattleLog(parsed);
        if (!battles || battles.length === 0) {
          this.sendErrorResponse(res, new Error("No battles found"), 404);
          return;
        }

        const parsedBattles = await this.crudDB.getModel().insertMany(battles);

        this.sendSuccessResponse(res, parsedBattles);
        return;
      }

      this.sendSuccessResponse(res, battles);
    } catch (error) {
      Logger.error(
        `Error fetching battles by tag: ${(error as Error).message}`,
      );
      this.sendErrorResponse(res, error as Error);
    }
  }

  isAlreadyExists(data: Battle[]): boolean {
    if (!data || data.length === 0) return false;
    return (
      data.filter((battle) => {
        const battleTime =
          battle.timestamp instanceof Date
            ? battle.timestamp
            : new Date(battle.timestamp);
        return Date.now() - battleTime.getTime() < 1000 * 60 * 60 * 24;
      }).length > 0
    );
  }
}

export { BattleController };
