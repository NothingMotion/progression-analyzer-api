"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAPIAccountToBrawlStarsAccount = void 0;
class IAPIAccountToBrawlStarsAccount {
    map(apiAccount) {
        return {
            playerTag: apiAccount.tag,
            name: apiAccount.name,
            trophies: apiAccount.trophies,
            highestTrophies: apiAccount.highestTrophies,
            powerPlayPoints: apiAccount.powerPlayPoints || 0,
            expLevel: apiAccount.expLevel,
            expPoints: apiAccount.expPoints,
            isQualifiedFromChampionshipChallenge: apiAccount.isQualifiedFromChampionshipChallenge || false,
            victories3vs3: apiAccount.victories3vs3 || 0,
            soloVictories: apiAccount.soloVictories || 0,
            duoVictories: apiAccount.duoVictories || 0,
            bestRoboRumbleTime: apiAccount.bestRoboRumbleTime || 0,
            bestTimeAsBigBrawler: apiAccount.bestTimeAsBigBrawler || 0,
            lastUpdated: new Date(),
        };
    }
}
exports.IAPIAccountToBrawlStarsAccount = IAPIAccountToBrawlStarsAccount;
