import { IStarrDropRarity } from "./IRarity";
import { IResources } from "./IResources";
import { IRewards } from "./IRewards";

interface IStarrDropReward {
  type: string;
  resource: IResources;
  chance: number;
}
interface IStarrDropRewards extends IRewards {
  rarity: IStarrDropRarity;
  rewards: IStarrDropReward[];
  chanceToDrop: number;
}

export { IStarrDropReward, IStarrDropRewards };
