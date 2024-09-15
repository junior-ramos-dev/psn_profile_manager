interface ITrophy {
  trophyId: number;
  trophyHidden: boolean;
  isEarned: boolean | undefined;
  isEarnedDateTime: string | undefined;
  trophyType: string;
  trophyRare: number | undefined;
  trophyEarnedRate: number;
  trophyName: string | undefined;
  trophyDetail: string | undefined;
  trophyIconUrl: string | undefined;
  trophyGroupId: string | undefined;
  rarity: string;
  groupId: string | undefined;
  points: number;
}

export interface ITrophyList {
  userId: string;
  gamesTrophies: GamesTrophies;
}

export interface GamesTrophies {
  npCommunicationId: string;
  trophyTitlePlatform: string;
  trophies: ITrophy[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface ITrophyCount {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
}

export interface ITrophySummary {
  level: number;
  progress: number;
  earnedTrophies: ITrophyCount;
}

export enum TROPHY_TYPE_NAME {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  PLATINUM = "platinum",
}

export const TROPHY_POINTS_MAP: Record<TROPHY_TYPE_NAME, number> = {
  [TROPHY_TYPE_NAME.BRONZE]: 15,
  [TROPHY_TYPE_NAME.SILVER]: 30,
  [TROPHY_TYPE_NAME.GOLD]: 90,
  [TROPHY_TYPE_NAME.PLATINUM]: 300,
};

export default ITrophy;
