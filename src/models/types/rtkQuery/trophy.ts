import { ITrophyTypeStats } from "@/models/interfaces/trophy/ITrophy";

export type SetTrophyCheckedRequest = {
  urlParams: {
    npCommunicationId: string;
    trophyTitlePlatform: string;
  };
  body: {
    trophyGroupId: string;
    trophyId: number;
    isChecked: boolean;
  };
};

export type GetEarnedTrophiesStatsRequest = {
  startDate: string;
  endDate: string;
};

export type GetEarnedTrophiesStatsResponse = {
  trophyTypeStats: ITrophyTypeStats[];
};
