import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/rtkQueryApi/common/axiosBaseQuery";
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

export const authApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "/auth",
  }),
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  keepUnusedDataFor: 60 * 60,
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "/login",
        method: VERBS.POST,

        data: { email, password },
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (data: RegisterRequest) => ({
        url: "/register",
        method: VERBS.POST,
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: VERBS.POST,
        data: {},
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: build.query<UserProfileData, string>({
      query: (id) => ({ url: `/users/${id}`, method: VERBS.GET, data: {} }),
      providesTags: (result, error, id) => [{ type: "Auth", id }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
