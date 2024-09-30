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
