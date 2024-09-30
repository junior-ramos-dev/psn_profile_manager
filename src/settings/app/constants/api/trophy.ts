// TROPHY ENDPOINTS
export const enum TROPHY_ENDPOINT_NAME {
  GET_TROPHY_LIST = "getTrophyList",
}

export const TROPHY_URL_MAP: Record<TROPHY_ENDPOINT_NAME, string> = {
  [TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST]:
    "trophy/:npCommunicationId/:trophyTitlePlatform/list",
};
