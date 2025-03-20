type IResource = { name: string; amount: number };
type Coin = IResource & { name: "Coins" };
type PowerPoint = IResource & { name: "PowerPoints" };
type Credit = IResource & { name: "Credit" };
type Gem = IResource & { name: "Gem" };
type StarrDrop = IResource & { name: "StarrDrop" };
type RankedDrop = StarrDrop & { name: "RankedDrop" };
type Bling = IResource & { name: "Bling" };
type Skin = IResource & { name: "Skin"; rarity: string };
type ProSkin = Skin & { name: "ProSkin"; level: number };
type ProfileIcon = IResource & { name: "ProfileIcon" };
type Pin = IResource & { name: "Pin" };
type IResources =
  | Coin
  | PowerPoint
  | Credit
  | Gem
  | StarrDrop
  | Bling
  | Skin
  | ProSkin
  | ProfileIcon
  | Pin;

export { IResources };
