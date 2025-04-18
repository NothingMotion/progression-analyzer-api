import { IBrawler } from "../types/IAccount";
import { IRarity } from "../types/IRarity";

class BrawlerRarityUtils {
  static isLegendary(brawler: IBrawler): boolean {
    return false;
  }
  static isEpic(brawler: IBrawler): boolean {
    return false;
  }
  static isRare(brawler: IBrawler): boolean {
    return false;
  }
  static isCommon(brawler: IBrawler): boolean {
    return false;
  }
  static isSuperRare(brawler: IBrawler): boolean {
    return false;
  }
  static isMythic(brawler: IBrawler): boolean {
    return false;
  }
  static get(brawler: IBrawler): IRarity {
    return "Common";
  }
  static is(brawler: IBrawler, target: IRarity): boolean {
    return BrawlerRarityUtils.get(brawler) === target;
  }
}

export { BrawlerRarityUtils };
