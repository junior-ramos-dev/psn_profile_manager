import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "@/models/types/rtkQuery/auth";
import { VERBS } from "@/settings/app/constants";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { AUTH_ENDPOINT_NAME, AUTH_URL_MAP } from ".";

export const authApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthLoginResponse, AuthLoginRequest>({
      query: ({ email, password }) => ({
        endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.LOGIN],
        method: VERBS.POST,
        bodyData: { email, password },
        collection: "Auth",
        endpointName: AUTH_ENDPOINT_NAME.LOGIN,
        headers: {
          Authorization: true,
        },
      }),
    }),
    register: build.mutation<AuthRegisterResponse, AuthRegisterRequest>({
      query: (data) => ({
        endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.REGISTER],
        method: VERBS.POST,
        bodyData: data,
        collection: "Auth",
        endpointName: AUTH_ENDPOINT_NAME.REGISTER,
        headers: {
          Authorization: true,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.LOGOUT],
        method: VERBS.POST,
        collection: "Auth",
        endpointName: AUTH_ENDPOINT_NAME.LOGOUT,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
