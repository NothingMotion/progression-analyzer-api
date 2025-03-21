import { ControllerBase } from "./ControllerBase";
import { IBrawlPassPlusRewards, IBrawlPassRewards } from "../types/IRewards";
import CrudDBBase from "./CrudDBBase";
import {
  BrawlPassFreeRewardsModel,
  BrawlPassPlusRewardsModel,
  BrawlPassRewardsModel,
} from "../models/PassRewardsModels";

class PassFreeController extends ControllerBase<IBrawlPassRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassRewards>(BrawlPassFreeRewardsModel));
  }

  protected override isMatch(data: any): data is IBrawlPassRewards {
    return data.id !== undefined;
  }
}

class PassController extends ControllerBase<IBrawlPassRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassRewards>(BrawlPassRewardsModel));
  }
}
class PassPlusController extends ControllerBase<IBrawlPassPlusRewards> {
  constructor() {
    super(new CrudDBBase<IBrawlPassPlusRewards>(BrawlPassPlusRewardsModel));
  }
}

export { PassFreeController, PassController, PassPlusController };
