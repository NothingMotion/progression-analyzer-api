import BrawlStarsAPI from "../lib/BrawlStarsAPI";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

/**
 * Singleton provider for BrawlStarsAPI
 * Ensures only one instance of the API client exists across the application
 */
class BrawlStarsAPIProvider {
  private static instance: BrawlStarsAPI | null = null;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}

  /**
   * Get the singleton instance of BrawlStarsAPI
   * Creates the instance on first call, reuses it after
   */
  public static getInstance(): BrawlStarsAPI {
    if (!BrawlStarsAPIProvider.instance) {
      const apiKey = process.env.BRAWLSTARS_API_KEY;

      if (!apiKey) {
        throw new Error("BRAWLSTARS_API_KEY environment variable is not set");
      }

      BrawlStarsAPIProvider.instance = new BrawlStarsAPI(
        process.env.BRAWLSTARS_API_URL || "https://api.brawlstars.com/v1",
        process.env.BRAWLSTARS_API_URL_ALTERNATIVE ||
          "https://brawltime.ninja/api/",
        "",
      );
    }

    return BrawlStarsAPIProvider.instance;
  }

  /**
   * Reset the singleton instance (primarily for testing purposes)
   */
  public static resetInstance(): void {
    BrawlStarsAPIProvider.instance = null;
  }
}

export default BrawlStarsAPIProvider;
