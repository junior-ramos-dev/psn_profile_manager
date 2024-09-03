// USER ENDPOINTS
export const enum USER_ENDPOINT_NAME {
  GET_USER_PROFILE = "getUserProfile",
}

export const USER_URL_MAP: Record<USER_ENDPOINT_NAME, string> = {
  [USER_ENDPOINT_NAME.GET_USER_PROFILE]: "user/profile",
};
