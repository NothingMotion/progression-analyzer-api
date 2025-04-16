import { TrophyRoadScraper } from "../lib/TrophyRoadScraper";

async function trophyRoadScraper() {
  const scraper = new TrophyRoadScraper();
  const response = await scraper.scrape();

  for (const reward of response) {
    console.log(reward);
  }
}

trophyRoadScraper();
