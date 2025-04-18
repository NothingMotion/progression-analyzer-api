"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrawlerRarityUtils = void 0;
class BrawlerRarityUtils {
    static isLegendary(brawler) {
        return false;
    }
    static isEpic(brawler) {
        return false;
    }
    static isRare(brawler) {
        return false;
    }
    static isCommon(brawler) {
        return false;
    }
    static isSuperRare(brawler) {
        return false;
    }
    static isMythic(brawler) {
        return false;
    }
    static get(brawler) {
        return "Common";
    }
    static is(brawler, target) {
        return BrawlerRarityUtils.get(brawler) === target;
    }
}
exports.BrawlerRarityUtils = BrawlerRarityUtils;
