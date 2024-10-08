// TROPHY ENDPOINTS
export const enum TROPHY_ENDPOINT_NAME {
  GET_TROPHY_LIST = "getTrophyList",
  SET_TROPHY_IS_CHECKED = "setTrophyIsChecked",
  GET_EARNED_TROPHIES_STATS = "getEarnedTrophiesStats",
  GET_TROPHY_LIST_BULK = "getTrophyListBulk",
}

export const TROPHY_URL_MAP: Record<TROPHY_ENDPOINT_NAME, string> = {
  [TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST]:
    "trophy/:npCommunicationId/:trophyTitlePlatform/list",
  [TROPHY_ENDPOINT_NAME.SET_TROPHY_IS_CHECKED]:
    "trophy/:npCommunicationId/:trophyTitlePlatform/checked",
  [TROPHY_ENDPOINT_NAME.GET_EARNED_TROPHIES_STATS]: "trophy/stats",
  [TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST_BULK]: "trophy/bulk",
};
