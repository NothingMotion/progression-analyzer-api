import { IResources } from "./IResources";

interface IRewards {
  id: number;
  name: string;
}
interface IPassRewards extends IRewards {
  resources: IResources[];
}
interface IBrawlPassRewards extends IPassRewards {}
interface IBrawlPassPlusRewards extends IBrawlPassRewards {}
interface IRankedPassRewards extends IPassRewards {
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
