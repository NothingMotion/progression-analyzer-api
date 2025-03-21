import { TrophyRoadRewardsModel } from "../models/TrophyRoadRewardsModel";
import {
  ITrophyRoadReward,
  ITrophyRoadRewards,
} from "../types/ITrophyRoadRewards";
import { ControllerBase } from "./ControllerBase";
import CrudDBBase from "./CrudDBBase";

class TrophyRoadController extends ControllerBase<ITrophyRoadRewards> {
  constructor() {
    super(new CrudDBBase<ITrophyRoadRewards>(TrophyRoadRewardsModel));
  }

  protected override isMatch(data: any): data is ITrophyRoadRewards {
    return data.id !== undefined;
  }
}
export { TrophyRoadController };
