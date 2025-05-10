"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCalculator = void 0;
const constants_1 = require("../constants/constants");
const BrawlerRarityUtils_1 = require("./BrawlerRarityUtils");
class AccountCalculator {
    static calculateCurrentProgress(account, isBoughtPass, isBoughtPassPlus, isBoughtRankedPass) {
        const currentAccount = account.account;
        const brawlers = currentAccount.brawlers;
        // math to the rescue!!
        const totalBrawlers = brawlers.length;
        const legenedary = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isLegendary(brawler)).length;
        const epic = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isEpic(brawler)).length;
        const rare = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isRare(brawler)).length;
        const common = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isCommon(brawler)).length;
        const superRare = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isSuperRare(brawler)).length;
        const mythic = brawlers.filter((brawler) => BrawlerRarityUtils_1.BrawlerRarityUtils.isMythic(brawler)).length;
        const gadgets = brawlers
            .filter((brawler) => brawler.gadgets &&
            Array.isArray(brawler.gadgets) &&
            brawler.gadgets.length > 0)
            .reduce((acc, brawler) => acc + brawler.gadgets.length, 0);
        const starPowers = brawlers
            .filter((brawler) => brawler.starPowers &&
            Array.isArray(brawler.starPowers) &&
            brawler.starPowers.length > 0)
            .reduce((acc, brawler) => acc + brawler.starPowers.length, 0);
        const gears = brawlers
            .filter((brawler) => brawler.gears &&
            Array.isArray(brawler.gears) &&
            brawler.gears.length > 0)
            .reduce((acc, brawler) => acc + brawler.gears.length, 0);
        let coins = 0;
        let powerPoints = 0;
        let credits = 0;
        for (const brawler of brawlers) {
            const power = brawler.power;
            let spentCoins = 0;
            let spentPowerPoints = 0;
            Object.entries(constants_1.BrawlerRarityTable).forEach(([rarity, value]) => {
                if (rarity === BrawlerRarityUtils_1.BrawlerRarityUtils.get(brawler)) {
                    credits += value;
                    return;
                }
            });
            constants_1.UpgradeTable.levels.forEach((level) => {
                if (power >= level.level) {
                    spentCoins += level.coins;
                    spentPowerPoints += level.powerPoints;
                }
            });
            coins += spentCoins;
            powerPoints += spentPowerPoints;
        }
        const averageBrawlerPower = Math.floor(brawlers.reduce((acc, brawler) => {
            return acc + brawler.power;
        }, 0) / brawlers.length);
        const averageBrawlerTrophies = Math.floor(brawlers.reduce((acc, brawler) => {
            return acc + brawler.trophies;
        }, 0) / brawlers.length);
        const progress = {
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
exports.AccountCalculator = AccountCalculator;
