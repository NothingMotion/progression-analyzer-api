import { Battle } from "./IBattle";

interface ClubMember {
  tag: string;
  name: string;
  nameColor: string;
  trophies: number;
  role: string;
  icon: {
    id: number;
  };
}
interface IClub {
  tag: string;
  name: string;
  description: string;
  type: string;
  badgeId: string;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
}
interface ClubActivityStatistics {
  lastActive: Record<string, Date | undefined>;
  commonBattles: Battle[];
  battlesByMode: Record<string, number>;
}

export { IClub, ClubMember, ClubActivityStatistics };
