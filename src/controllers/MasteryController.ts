import { ControllerBase } from "./ControllerBase";
import { IMasteryRewards } from "../types/IMasteryRewards";
import CrudDBBase from "./CrudDBBase";
import { MasteryRewardsModel } from "../models/MasteryRewardsModel";
class MasteryController extends ControllerBase<IMasteryRewards> {
  constructor() {
    super(new CrudDBBase<IMasteryRewards>(MasteryRewardsModel));
  }
  protected override isMatch(data: any): data is IMasteryRewards {
    return data.id !== undefined;
  }
}

export { MasteryController };
