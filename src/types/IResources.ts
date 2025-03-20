import { IRarity } from "./IRarity";

type IResource = { name: string; amount: number };
type Coin = IResource & { name: "Coins" };
type PowerPoint = IResource & { name: "PowerPoints" };
type Credit = IResource & { name: "Credit" };
type Gem = IResource & { name: "Gem" };
type StarrDrop = IResource & { name: "StarrDrop" ,rarity:IRarity};
type RankedDrop = StarrDrop & { name: "RankedDrop" };
type Bling = IResource & { name: "Bling" };
type XPDoubler = IResource & { name: "XP Doubler" };
type Skin = IResource & { name: "Skin"; rarity: string };
type ProSkin = Skin & { name: "ProSkin"; level: number };
type ProfileIcon = IResource & { name: "ProfileIcon" };
type Pin = IResource & { name: "Pin" };
type Spray = IResource & { name: "Spray" };
type Brawler = IResource & { name: "Brawler"; rarity: IRarity };
type StarPower = IResource & { name: "StarPower" };
type Gadget = IResource & { name: "Gadget" };
type Hypercharge = IResource & { name: "Hypercharge" };
type IResources =
  | Coin
  | PowerPoint
  | Credit
  | Gem
  | StarrDrop
  | RankedDrop
  | Bling
  | XPDoubler
  | Skin
  | ProSkin
  | ProfileIcon
  | Pin
  | Spray
  | Brawler
  | Gadget
  | StarPower
  | Hypercharge;

export { IResources };
