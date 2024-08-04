import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/models/types/rtkQuery/auth";
import { rtkQueryBaseApi } from "../base/rtkQueryBaseApi";
import { VERBS } from "@/utils/restApi";
import { UserProfileData } from "@/models/types/rtkQuery/user";

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
      transformResponse: (response) => {
        const loginResponse = response.data;

        // Return an object containing the response data value
        return loginResponse;
      },
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (data: RegisterRequest) => ({
        endpointUrl: "auth/register",
        method: VERBS.POST,
        bodyData: data,
        collection: "Auth",
        endpointName: "register",
      }),
      transformResponse: (response) => {
        const registerResponse = response.data;

        // Return an object containing the response data value
        return registerResponse;
      },
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        endpointUrl: "auth/logout",
        method: VERBS.POST,
        collection: "Auth",
        endpointName: "logout",
      }),
      transformResponse: (response) => {
        const logoutResponse = response.data;

        // Return an object containing the response data value
        return logoutResponse;
      },
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
      transformResponse: (response) => {
        const userProfileDataResponse = response.data;

        // Return an object containing the response data value
        return userProfileDataResponse;
      },
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
