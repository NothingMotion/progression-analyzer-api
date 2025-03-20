import { BrawlerRarityTable, UpgradeTable } from "../constants/constants";
import { BrawlStarsAccount, ICurrentProgress } from "../types/IAccount";
import { BrawlerRarityUtils } from "./BrawlerRarityUtils";

class AccountCalculator {
  static calculateCurrentProgress(
    account: BrawlStarsAccount,
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
      .filter((brawler) => brawler.gadgets?.length)
      .reduce((acc, brawler) => {
        return acc + (brawler.gadgets?.length || 0);
      }, 0);
    const starPowers = brawlers
      .filter((brawler) => brawler.starPowers?.length)
      .reduce((acc, brawler) => {
        return acc + (brawler.starPowers?.length || 0);
      }, 0);
    const gears = brawlers
      .filter((brawler) => brawler.gears?.length)
      .reduce((acc, brawler) => {
        return acc + (brawler.gears?.length || 0);
      }, 0);

    let coins: number = 0;
    let powerPoints: number = 0;
    let credits: number = 0;

    for (const brawler of brawlers) {
      const power = brawler.power;

      let spentCoins = 0;
      let spentPowerPoints = 0;
      Object.entries(BrawlerRarityTable).forEach(([rarity, value]) => {
        if (rarity === BrawlerRarityUtils.get(brawler)) {
          credits += value;
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

    return account.currentProgress;
  }
}

export { AccountCalculator };
