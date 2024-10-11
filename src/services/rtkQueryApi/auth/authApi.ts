import { ITaskLoaderData } from "@/models/interfaces/ITaskLoaderData";
import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "@/models/types/rtkQuery/auth";
import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { VERBS } from "@/settings/app/constants";
import {
  AUTH_ENDPOINT_NAME,
  AUTH_URL_MAP,
} from "@/settings/app/constants/api/auth";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const authApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthLoginResponse, AuthLoginRequest>({
      query: ({ email, password }) => ({
        endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.LOGIN],
        method: VERBS.POST,
        bodyData: { email, password },
        collection: "Auth",
        endpointName: AUTH_ENDPOINT_NAME.LOGIN,
      }),
    }),
    register: build.mutation<AuthRegisterResponse, AuthRegisterRequest>({
      query: (data) => ({
        endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.REGISTER],
        method: VERBS.POST,
        bodyData: data,
        collection: "Auth",
        endpointName: AUTH_ENDPOINT_NAME.REGISTER,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerLoader: build.mutation<ITaskLoaderData, IAxiosBaseQueryArgs>({
      query: ({
        endpointUrl,
        method,
        bodyData,
        urlParams,
        collection,
        endpointName,
      }) => ({
        endpointUrl: endpointUrl,
        method: method,
        bodyData: bodyData,
        urlParams: urlParams,
        collection: collection,
        endpointName: endpointName,
      }),
      // transformResponse: (response) => {
      //   const responseData = response.data;

      //   if (
      //     responseData &&
      //     "user" in responseData &&
      //     "profile" in responseData
      //   ) {
      //     const { user, profile } = responseData;

      //     store.dispatch(actionSetCredentials(user));
      //     store.dispatch(actionSetUseProfile(profile));
      //   }

      //   return response;
      // },
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
