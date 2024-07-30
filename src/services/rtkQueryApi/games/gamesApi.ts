import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/rtkQueryApi/common/axiosBaseQuery";
import { IGame } from "@/models/interfaces";
import { VERBS } from "@/utils/restApi";

export const gamesApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "/games",
  }),
  reducerPath: "gamesApi",
  tagTypes: ["Games"],
  keepUnusedDataFor: 60 * 60,
  endpoints: (build) => ({
    getGameList: build.query<IGame[], string>({
      query: () => ({ url: "", method: VERBS.GET, data: {} }),
      providesTags: ["Games"],
    }),
  }),
});

export const { useGetGameListQuery } = gamesApi;
