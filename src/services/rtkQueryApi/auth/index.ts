export * as authSelectors from "./authSelectors";

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
