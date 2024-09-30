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
  isChecked: boolean | undefined;
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

export interface ITrophyGroupsInfo {
  definedGroupInfo: IDefinedGroupInfo;
  earnedGroupInfo: IEarnedGroupInfo;
  groupTrophies: ITrophy[];
}

export interface IDefinedGroupInfo {
  trophyGroupId: string;
  trophyGroupName: string;
  trophyGroupIconUrl: string;
  definedTrophies: ITrophyCount;
}

export interface IEarnedGroupInfo {
  trophyGroupId: string;
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

export const getTrophiesTotalPoints = (trophyCount: ITrophyCount) => {
  let count: number = 0;

  count += trophyCount.bronze * TROPHY_POINTS_MAP[TROPHY_TYPE_NAME.BRONZE];
  count += trophyCount.silver * TROPHY_POINTS_MAP[TROPHY_TYPE_NAME.SILVER];
  count += trophyCount.gold * TROPHY_POINTS_MAP[TROPHY_TYPE_NAME.GOLD];
  count += trophyCount.platinum * TROPHY_POINTS_MAP[TROPHY_TYPE_NAME.PLATINUM];

  return count;
};

export default ITrophy;
