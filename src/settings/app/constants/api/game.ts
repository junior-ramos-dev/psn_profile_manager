import { setEnpointHeader } from "@/utils/http";

import { DUMMY_ETAG_HEADER, HEADERS } from "../http";

// GAME ENDPOINTS
export const enum GAME_ENDPOINT_NAME {
  GET_GAME_LIST = "getGameList",
  GAME_LIST_LOADER = "gameListLoader",
  GET_ICON_BIN_BY_GAME = "getIconBinByGame",
  GET_ICON_BIN_BY_GAME_IDS = "getIconBinByGameIds",
}

export const GAME_URL_MAP: Record<GAME_ENDPOINT_NAME, string> = {
  [GAME_ENDPOINT_NAME.GET_GAME_LIST]: "game/list",
  [GAME_ENDPOINT_NAME.GAME_LIST_LOADER]: "game/list",
  [GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME]: "game/icon",
  [GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME_IDS]: "game/icon/list",
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
