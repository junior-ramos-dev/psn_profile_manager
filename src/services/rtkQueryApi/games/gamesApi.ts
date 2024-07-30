import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/rtkQueryApi/axiosBaseQuery";
import { IGame } from "@/models/interfaces";
import { REST_VERB } from "@/utils/api";

export const gamesApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "/games",
  }),
  reducerPath: "gamesApi",
  tagTypes: ["Games"],
  keepUnusedDataFor: 60 * 60,
  endpoints: (build) => ({
    getGameList: build.query<IGame[], string>({
      query: () => ({ url: "", method: REST_VERB.GET, data: {} }),
      providesTags: ["Games"],
    }),
  }),
});

export const { useGetGameListQuery } = gamesApi;
