export type GameDetailsRequest = {
  trophyTitlePlatform: string;
  npCommunicationId: string;
  imgType?: string;
  getTrophies?: number;
};

export type IconBinListRequest = {
  npCommIdList: string[];
  imgType: string;
};

export type IconBinByImgTypeRequest = {
  npCommunicationId: string;
  imgType: string;
};
