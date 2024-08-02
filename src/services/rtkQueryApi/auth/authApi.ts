import { rtkQueryBaseApi } from "../common/rtkQueryBaseApi";
import { VERBS } from "@/utils/restApi";

//TODO Refactor types
type UserProfileData = {
  name: string;
  email: string;
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  id: string;
  name: string;
  email: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  id: string;
  name: string;
  email: string;
};

export const authApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: VERBS.POST,

        data: { email, password },
      }),
      transformResponse: (response) => {
        const loginResponse = response.data;

        // Return an object containing the response data value
        return loginResponse;
      },
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (data: RegisterRequest) => ({
        url: "/auth/register",
        method: VERBS.POST,
        data,
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
        url: "/auth/logout",
        method: VERBS.POST,
        data: {},
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
        url: `/auth/users/${id}`,
        method: VERBS.GET,
        data: {},
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
