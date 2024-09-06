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

export default ITrophy;
