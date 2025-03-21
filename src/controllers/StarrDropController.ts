import CrudDBBase from "./CrudDBBase";

import { ControllerBase } from "./ControllerBase";
import { IStarrDropRewards } from "../types/IStarrDropRewards";
import { StarrDropRewardsModel } from "../models/StarrDropRewardsModel";

class StarrDropController extends ControllerBase<IStarrDropRewards> {
  constructor() {
    super(new CrudDBBase<IStarrDropRewards>(StarrDropRewardsModel));
  }

  protected override isMatch(data: any): data is IStarrDropRewards {
    return data.id !== undefined;
  }
}

export { StarrDropController };
