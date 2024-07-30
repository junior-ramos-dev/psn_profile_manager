import { rtkQueryBaseApi } from "../common/rtkQueryBaseApi";
import { IGame } from "@/models/interfaces";
import { VERBS } from "@/utils/restApi";

export const gamesApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGame[], string>({
      query: () => ({ url: "/games", method: VERBS.GET, data: {} }),
      providesTags: ["Games"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGameListQuery } = gamesApi;
