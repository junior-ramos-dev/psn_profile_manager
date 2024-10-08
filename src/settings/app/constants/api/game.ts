import { setEnpointHeader } from "@/utils/http";

import { DUMMY_ETAG_HEADER, HEADERS } from "../http";

// GAME ENDPOINTS
export const enum GAME_ENDPOINT_NAME {
  GET_GAME_LIST = "getGameList",
  GAME_LIST_LOADER = "gameListLoader",
  GET_GAME_DETAILS = "getGameDetails",
  GET_GAME_DETAILS_LIST = "getGameDetailsList",

  GET_GAME_ICON_BIN = "getGameIconBin",
  GET_GAME_ICON_BIN_BY_IMG_TYPE = "getGameIconBinByImgType",
  GET_GAMES_ICON_BIN_LIST = "getGamesIconBinList",
}

export const GAME_URL_MAP: Record<GAME_ENDPOINT_NAME, string> = {
  [GAME_ENDPOINT_NAME.GET_GAME_LIST]: "game/list",
  [GAME_ENDPOINT_NAME.GAME_LIST_LOADER]: "game/list",
  [GAME_ENDPOINT_NAME.GET_GAME_DETAILS]:
    "game/:npCommunicationId/:trophyTitlePlatform/details?imgType=:imgType&getTrophies=:getTrophies",
  [GAME_ENDPOINT_NAME.GET_GAME_DETAILS_LIST]:
    "game/details?limit=:limit&offset=:offset&imgType=:imgType&getTrophies=:getTrophies",

  [GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN]: "game/icon/:npCommunicationId",
  [GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN_BY_IMG_TYPE]:
    "game/icon/:npCommunicationId/:imgType",
  [GAME_ENDPOINT_NAME.GET_GAMES_ICON_BIN_LIST]: "game/icon/list",
};

// Reset/Remove headers in localStorage
export const resetGameEndpointHeaders = () => {
  // Game endpoints
  setEnpointHeader(
    GAME_ENDPOINT_NAME.GAME_LIST_LOADER,
    HEADERS.ETAG,
    DUMMY_ETAG_HEADER
  );
  setEnpointHeader(
    GAME_ENDPOINT_NAME.GAME_LIST_LOADER,
    HEADERS.IF_NONE_MATCH,
    DUMMY_ETAG_HEADER
  );
};
