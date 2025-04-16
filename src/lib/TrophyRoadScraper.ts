import axios from "axios";
import * as cheerio from "cheerio";

interface TrophyRoadReward {
  milestone: number;
  reward: string;
}

abstract class Scraper<T> {
  abstract scrape(): Promise<T>;
}

class TrophyRoadScraper extends Scraper<TrophyRoadReward[]> {
  private readonly url =
    "https://brawlstars.fandom.com/wiki/Trophies#Trophy_Road";

  async scrape(): Promise<TrophyRoadReward[]> {
    try {
      const response = await axios.get(this.url);
      const $ = cheerio.load(response.data);
      const rewards: TrophyRoadReward[] = [];

      // Find all trophy road tables with the specified class
      $("table.article-table.mw-collapsible").each((_, table) => {
        // Check if the table or its container has trophy road related text
        const tableText = $(table).text().toLowerCase();
        const tableHeading = $(table).prev("h2, h3, h4").text().toLowerCase();
        const tableCaption = $(table).find("caption").text().toLowerCase();

        if (
          tableText.includes("trophy road") ||
          tableHeading.includes("trophy road") ||
          tableCaption.includes("trophy road") ||
          tableText.includes("trophy milestone")
        ) {
          // Validate that the table has the right structure by checking headers
          const headers = $(table)
            .find("tr:first-child, thead tr")
            .text()
            .toLowerCase();
          if (
            headers.includes("milestone") ||
            headers.includes("trophy") ||
            headers.includes("reward")
          ) {
            // Process each row in the table
            $(table)
              .find("tr")
              .each((index, row) => {
                // Skip header row
                if (index === 0 && $(row).find("th").length > 0) {
                  return;
                }

                const cells = $(row).find("td");
                if (cells.length >= 2) {
                  const milestone = parseInt($(cells[0]).text().trim(), 10);
                  const reward = $(cells[1]).text().trim();

                  if (!isNaN(milestone)) {
                    rewards.push({
                      milestone,
                      reward,
                    });
                  }
                }
              });
          }
        }
      });

      return rewards.sort((a, b) => a.milestone - b.milestone);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to scrape trophy road: ${error.message}`);
      }
      throw error;
    }
  }
}

export { TrophyRoadScraper, TrophyRoadReward };
