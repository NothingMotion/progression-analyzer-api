import CrudDBBase from "./CrudDBBase";

import { ControllerBase } from "./ControllerBase";
import { IStarrDropRewards } from "../types/IStarrDropRewards";
import { StarrDropRewardsModel } from "../models/StarrDropRewardsModel";
import { StarrDropChancesTable } from "../constants/constants";
import { Request, Response } from "express";

class StarrDropController extends ControllerBase<IStarrDropRewards> {
  constructor() {
    super(new CrudDBBase<IStarrDropRewards>(StarrDropRewardsModel));
  }

  protected override isMatch(data: any): data is IStarrDropRewards {
    return data.id !== undefined;
  }

  async get(req: Request, res: Response) {
    this.sendSuccessResponse(res, StarrDropChancesTable);
  }
}

export { StarrDropController };
