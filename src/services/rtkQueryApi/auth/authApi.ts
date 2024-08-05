import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/models/types/rtkQuery/auth";
import { UserProfileData } from "@/models/types/rtkQuery/user";
import { VERBS } from "@/utils/restApi";

import { rtkQueryBaseApi } from "../base/rtkQueryBaseApi";

export const authApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        endpointUrl: "auth/login",
        method: VERBS.POST,
        bodyData: { email, password },
        collection: "Auth",
        endpointName: "login",
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (data: RegisterRequest) => ({
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
    //TODO Move to users api
    getUser: build.query<UserProfileData, string>({
      query: (id) => ({
        endpointUrl: "auth/users",
        method: VERBS.GET,
        urlParam: id,
        collection: "Auth",
        endpointName: "getUser",
      }),
      providesTags: (result, error, id) => [{ type: "Auth", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
