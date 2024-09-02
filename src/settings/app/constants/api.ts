// AUTH ENDPOINTS
export const enum AUTH_ENDPOINT_NAME {
  LOGIN = "login",
  REGISTER = "register",
  LOGOUT = "logout",
}

export const AUTH_URL_MAP: Record<AUTH_ENDPOINT_NAME, string> = {
  [AUTH_ENDPOINT_NAME.REGISTER]: "auth/register",
  [AUTH_ENDPOINT_NAME.LOGIN]: "auth/login",
  [AUTH_ENDPOINT_NAME.LOGOUT]: "auth/logout",
};

// GAME ENDPOINTS
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

// GAME LOADER ENDPOINTS
export const enum GAME_LOADER_ENDPOINT_NAME {
  GAME_LIST_LOADER = "getGameListLoader",
}

export const GAME_LOADER_URL_MAP: Record<GAME_LOADER_ENDPOINT_NAME, string> = {
  [GAME_LOADER_ENDPOINT_NAME.GAME_LIST_LOADER]: "game/list",
};

// TROPHY ENDPOINTS
export const enum TROPHY_ENDPOINT_NAME {
  GET_TROPHY_LIST = "getTrophyList",
}

export const TROPHY_URL_MAP: Record<TROPHY_ENDPOINT_NAME, string> = {
  [TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST]:
    "trophy/:trophyTitlePlatform/:npCommunicationId/list",
};
