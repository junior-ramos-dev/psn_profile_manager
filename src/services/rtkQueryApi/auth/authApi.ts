import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "@/models/types/rtkQuery/auth";
import { VERBS } from "@/utils/http";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const authApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthLoginResponse, AuthLoginRequest>({
      query: ({ email, password }) => ({
        endpointUrl: "auth/login",
        method: VERBS.POST,
        bodyData: { email, password },
        collection: "Auth",
        endpointName: "login",
      }),
    }),
    register: build.mutation<AuthRegisterResponse, AuthRegisterRequest>({
      query: (data) => ({
        endpointUrl: "auth/register",
        method: VERBS.POST,
        bodyData: data,
        collection: "Auth",
        endpointName: "register",
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        endpointUrl: "auth/logout",
        method: VERBS.POST,
        collection: "Auth",
        endpointName: "logout",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
