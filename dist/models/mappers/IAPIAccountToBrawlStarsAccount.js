"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                level: data.level,
                trophies: data.trophies,
                highestTrophies: data.highestTrophies,
                soloVictories: data.soloVictories,
                duoVictories: data.duoVictories,
                trioVictories: data.trioVictories,
                bestRoboRumbleTime: data.bestRoboRumbleTime,
                bestTimeAsBigBrawler: data.bestTimeAsBigBrawler,
                brawlers: data.brawlers,
            },
            history: history,
            previousProgresses: previousProgresses,
            currentProgress: currentProgress,
            futureProgresses: futureProgresses,
            createdAt: createdAt,
            updatedAt: updatedAt,
        };
    }
}
