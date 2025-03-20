import { IResources } from "./IResources";

interface IRewards {
  id: number;
  name: string;
}

interface IBrawlPassRewards extends IRewards {
  resources: IResources[];
}
interface IBrawlPassPlusRewards extends IBrawlPassRewards {}
interface IRankedPassRewards extends IRewards {
  resources: IResources[];
}

interface IRankedProPassRewards extends IRankedPassRewards {}

export {
  IRewards,
  IBrawlPassRewards,
  IBrawlPassPlusRewards,
  IRankedPassRewards,
  IRankedProPassRewards,
};
