import { IRarity } from "./IRarity";
import { IResources } from "./IResources";
import { IRewards } from "./IRewards";

interface IMasteryLevelRewards {
  level: number;
  type: string;
  resource: IResources;
}
interface IMasteryRewards extends IRewards {
  id: number;
  name: string;
  brawlerRarity: IRarity;
  rewards: IMasteryLevelRewards[];
}

export { IMasteryRewards };
