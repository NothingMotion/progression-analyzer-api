"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlayerProfile = fetchPlayerProfile;
const di_1 = require("../di");
/**
 * Type guard to check if the result is an IAPIAccount
 */
function isAPIAccount(data) {
    return (data &&
        typeof data === "object" &&
        "tag" in data &&
        "name" in data &&
        "trophies" in data);
}
/**
 * Example demonstrating how to use the BrawlStarsAPI singleton
 */
function fetchPlayerProfile(playerTag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the singleton instance
            const brawlStarsAPI = di_1.BrawlStarsAPIProvider.getInstance();
            // Use the API to fetch player data
            const playerData = yield brawlStarsAPI.get(playerTag);
            // Check if the result is a player profile
            if (isAPIAccount(playerData)) {
                // Log the player data
                console.log(`Player profile for ${playerData.name} (${playerData.tag}):`);
                console.log(`- Trophies: ${playerData.trophies}`);
                console.log(`- Level: ${playerData.level}`);
                console.log(`- Brawlers: ${playerData.brawlers.length}`);
            }
            else {
                console.error("Error: Did not receive player data", playerData);
                return;
            }
            // Multiple parts of the application can use the same instance
            const sameInstance = di_1.BrawlStarsAPIProvider.getInstance();
            console.log(`Is same instance: ${brawlStarsAPI === sameInstance}`); // Will log true
        }
        catch (error) {
            console.error("Error fetching player profile:", error);
        }
    });
}
