export * as gameSelectors from "./gameSelectors";

export const enum GAME_ENDPOINT_NAME {
  GET_GAME_LIST = "getGameList",
  GET_ICON_BIN_BY_GAME = "getIconBinByGame",
  GET_ICON_BIN_BY_GAME_IDS = "getIconBinByGameIds",
}

export const GAME_URL_MAP: Record<GAME_ENDPOINT_NAME, string> = {
  [GAME_ENDPOINT_NAME.GET_GAME_LIST]: "game/list",
  [GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME]: "game/icon",
  [GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME_IDS]: "game/icon/list",
};
