import { ControllerBase } from "./ControllerBase";
import { IBrawlPassPlusRewards, IBrawlPassRewards } from "../types/IRewards";
import CrudDBBase from "./CrudDBBase";
import {
  BrawlPassFreeRewardsModel,
  BrawlPassPlusRewardsModel,
  BrawlPassRewardsModel,
} from "../models/PassRewardsModels";
import { Request, Response } from "express";
import {
  BrawlPassFreeRewardsTable,
  BrawlPassPlusRewardsTable,
  BrawlPassPremiumRewardsTable,
} from "../constants/constants";

class PassFreeController extends ControllerBase<IBrawlPassRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassRewards>(BrawlPassFreeRewardsModel));
  }

  protected override isMatch(data: any): data is IBrawlPassRewards {
    return data.id !== undefined;
  }
  async get(req: Request, res: Response) {
    this.sendSuccessResponse(res, BrawlPassFreeRewardsTable);
  }
}

class PassController extends ControllerBase<IBrawlPassRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassRewards>(BrawlPassRewardsModel));
  }
  async get(req: Request, res: Response) {
    this.sendSuccessResponse(res, BrawlPassPremiumRewardsTable);
  }
}
class PassPlusController extends ControllerBase<IBrawlPassPlusRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassPlusRewards>(BrawlPassPlusRewardsModel));
  }
  async get(req: Request, res: Response) {
    this.sendSuccessResponse(res, BrawlPassPlusRewardsTable);
  }
}

export { PassFreeController, PassController, PassPlusController };
