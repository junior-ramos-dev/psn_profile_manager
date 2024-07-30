import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/rtkqApi/axiosBaseQuery";
import { REST_VERB } from "@/utils/api";

//TODO Refactor types
type NewUser = {
  name: string;
  email: string;
  password: string;
};

type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
};

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
        method: REST_VERB.POST,

        data: { email, password },
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (data: NewUser) => ({
        url: "/register",
        method: REST_VERB.POST,
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: REST_VERB.POST,
        data: {},
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: build.query<UserProfileData, string>({
      query: (id) => ({ url: `/users/${id}`, method: REST_VERB.GET, data: {} }),
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

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
//   reducerPath: "pokemonApi",
//   endpoints: (build) => ({
//     getPokemonByName: build.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// });

// export const { useGetPokemonByNameQuery } = api;

// export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
//   "pokemon/fetchByName",
//   async (name, { rejectWithValue }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     const data = await response.json();
//     if (response.status < 200 || response.status >= 300) {
//       return rejectWithValue(data);
//     }
//     return data;
//   }
// );
