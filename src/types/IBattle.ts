export interface LeagueRank {
  league:
    | "Bronze"
    | "Silver"
    | "Gold"
    | "Diamond"
    | "Mythic"
    | "Legendary"
    | "Masters";
  leagueSub: "I" | "II" | "III";
  formatted: string;
}

export interface Battle {
  timestamp: Date;
  ranked: boolean;
  event: {
    id: number;
    mode: string;
    map: string;
  };
  result: string;
  victory: undefined | boolean;
  trophyChange: undefined | number;
  teams: {
    tag: string;
    name: string;
    brawler: string;
    brawlerTrophies: number;
    brawlerRank: undefined | LeagueRank;
    isBigbrawler: boolean;
  }[][];
}
