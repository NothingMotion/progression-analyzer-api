import { IResources } from "./IResources";
import { IRewards } from "./IRewards";

interface ITrophyRoadReward {
  milestone: number;
  resource?: IResources;
}
interface ITrophyRoadRewards extends IRewards {
  rewards: ITrophyRoadReward[];
}

export { ITrophyRoadReward, ITrophyRoadRewards };
