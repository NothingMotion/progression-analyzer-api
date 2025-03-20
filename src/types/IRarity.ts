type IRarity =
  | "Common"
  | "Rare"
  | "SuperRare"
  | "Epic"
  | "Mythic"
  | "Legendary";

type IStarrDropRarity = IRarity;
type IRankedDropRarity = IRarity;

export { IRarity, IStarrDropRarity, IRankedDropRarity };
