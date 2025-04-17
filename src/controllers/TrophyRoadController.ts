import { Request, Response } from "express";
import { TrophyRoadRewardsModel } from "../models/TrophyRoadRewardsModel";
import {
  ITrophyRoadReward,
  ITrophyRoadRewards,
} from "../types/ITrophyRoadRewards";
import { ControllerBase } from "./ControllerBase";
import CrudDBBase from "./CrudDBBase";
import { TrophyRoadScraper } from "../lib/TrophyRoadScraper";

class TrophyRoadController extends ControllerBase<ITrophyRoadRewards> {
  constructor() {
    super(new CrudDBBase<ITrophyRoadRewards>(TrophyRoadRewardsModel));
  }

  protected override isMatch(data: any): data is ITrophyRoadRewards {
    return data.id !== undefined;
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const scraper = new TrophyRoadScraper();
      const rewards = await scraper.scrape();
      res.status(200).json(rewards);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}
export { TrophyRoadController };
