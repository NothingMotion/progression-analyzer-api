import { BrawlerRarityTable, UpgradeTable } from "../constants/constants";
import {
  BrawlStarsAccount,
  ICurrentProgress,
  IProgress,
} from "../types/IAccount";
import { BrawlerRarityUtils } from "./BrawlerRarityUtils";

class AccountCalculator {
  static calculateCurrentProgress(
    account: BrawlStarsAccount,
    isBoughtPass: boolean,
    isBoughtPassPlus: boolean,
    isBoughtRankedPass: boolean,
  ): ICurrentProgress {
    const currentAccount = account.account;
    const brawlers = currentAccount.brawlers;

    // math to the rescue!!

    const totalBrawlers = brawlers.length;
    const legenedary = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isLegendary(brawler),
    ).length;
    const epic = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isEpic(brawler),
    ).length;
    const rare = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isRare(brawler),
    ).length;
    const common = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isCommon(brawler),
    ).length;
    const superRare = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isSuperRare(brawler),
    ).length;
    const mythic = brawlers.filter((brawler) =>
      BrawlerRarityUtils.isMythic(brawler),
    ).length;

    const gadgets = brawlers
      .filter(
        (brawler) =>
          brawler.gadgets &&
          Array.isArray(brawler.gadgets) &&
          brawler.gadgets.length > 0,
      )
      .reduce((acc, brawler) => acc + brawler.gadgets!.length, 0);

    const starPowers = brawlers
      .filter(
        (brawler) =>
          brawler.starPowers &&
          Array.isArray(brawler.starPowers) &&
          brawler.starPowers.length > 0,
      )
      .reduce((acc, brawler) => acc + brawler.starPowers!.length, 0);

    const gears = brawlers
      .filter(
        (brawler) =>
          brawler.gears &&
          Array.isArray(brawler.gears) &&
          brawler.gears.length > 0,
      )
      .reduce((acc, brawler) => acc + brawler.gears!.length, 0);

    let coins: number = 0;
    let powerPoints: number = 0;
    let credits: number = 0;

    for (const brawler of brawlers) {
      const power = brawler.power;

      let spentCoins = 0;
      let spentPowerPoints = 0;
      BrawlerRarityTable.forEach((rarity) => {
        if (rarity.name === BrawlerRarityUtils.get(brawler)) {
          credits += rarity.value;
          return;
        }
      });
      UpgradeTable.levels.forEach((level) => {
        if (power >= level.level) {
          spentCoins += level.coins;
          spentPowerPoints += level.powerPoints;
        }
      });
      coins += spentCoins;
      powerPoints += spentPowerPoints;
    }

    const averageBrawlerPower = Math.floor(
      brawlers.reduce((acc, brawler) => {
        return acc + brawler.power;
      }, 0) / brawlers.length,
    );

    const averageBrawlerTrophies = Math.floor(
      brawlers.reduce((acc, brawler) => {
        return acc + brawler.trophies;
      }, 0) / brawlers.length,
    );

    const progress: IProgress = {
      coins: coins,
      powerPoints: powerPoints,
      credits: credits,
      brawlers: brawlers.length,
      starPowers: starPowers,
      gears: gears,
      gadgets: gadgets,
      averageBrawlerPower,
      averageBrawlerTrophies,
      isBoughtPass,
      isBoughtPassPlus,
      isBoughtRankedPass,
      duration: new Date(),
    };
    return progress;
  }
}

export { AccountCalculator };
