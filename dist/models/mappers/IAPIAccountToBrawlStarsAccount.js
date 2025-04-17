"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAPIAccountToBrawlStarsAccount = void 0;
const MapperBase_1 = require("./MapperBase");
class IAPIAccountToBrawlStarsAccount extends MapperBase_1.MapperBase {
    map(data, ...args) {
        const currentProgress = args[0];
        const futureProgresses = args[1];
        const previousProgresses = args[2];
        const history = args[3];
        const createdAt = args[4];
        const updatedAt = args[5];
        return {
            account: {
                tag: data.tag,
                name: data.name,
                icon: data.icon,
                expLevel: data.expLevel || 0,
                expPoints: data.expPoints || 0,
                trophies: data.trophies || 0,
                highestTrophies: data.highestTrophies || 0,
                soloVictories: data.soloVictories || 0,
                duoVictories: data.duoVictories || 0,
                trioVictories: data.trioVictories || 0,
                bestRoboRumbleTime: data.bestRoboRumbleTime || 0,
                bestTimeAsBigBrawler: data.bestTimeAsBigBrawler || 0,
                brawlers: data.brawlers || [],
            },
            history: history || [],
            previousProgresses: previousProgresses || [],
            currentProgress: currentProgress,
            futureProgresses: futureProgresses || [],
            createdAt: createdAt || new Date(),
            updatedAt: updatedAt || new Date(),
        };
    }
}
exports.IAPIAccountToBrawlStarsAccount = IAPIAccountToBrawlStarsAccount;
