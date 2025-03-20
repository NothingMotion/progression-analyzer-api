import { BrawlStarsAPIProvider } from "../di";
import { IAPIAccount } from "../types/IAccount";
import BrawlStarsAPI from "../lib/BrawlStarsAPI";

/**
 * Type guard to check if the result is an IAPIAccount
 */
function isAPIAccount(data: any): data is IAPIAccount {
  return (
    data &&
    typeof data === "object" &&
    "tag" in data &&
    "name" in data &&
    "trophies" in data
  );
}

/**
 * Example demonstrating how to use the BrawlStarsAPI singleton
 */
async function fetchPlayerProfile(playerTag: string): Promise<void> {
  try {
    // Get the singleton instance
    const brawlStarsAPI = BrawlStarsAPIProvider.getInstance();

    // Use the API to fetch player data
    const playerData = await brawlStarsAPI.get(playerTag);

    // Check if the result is a player profile
    if (isAPIAccount(playerData)) {
      // Log the player data
      console.log(`Player profile for ${playerData.name} (${playerData.tag}):`);
      console.log(`- Trophies: ${playerData.trophies}`);
      console.log(`- Level: ${playerData.level}`);
      console.log(`- Brawlers: ${playerData.brawlers.length}`);
    } else {
      console.error("Error: Did not receive player data", playerData);
      return;
    }

    // Multiple parts of the application can use the same instance
    const sameInstance = BrawlStarsAPIProvider.getInstance();
    console.log(`Is same instance: ${brawlStarsAPI === sameInstance}`); // Will log true
  } catch (error) {
    console.error("Error fetching player profile:", error);
  }
}

// Example usage
// fetchPlayerProfile('YOUR_PLAYER_TAG_HERE');

export { fetchPlayerProfile };
