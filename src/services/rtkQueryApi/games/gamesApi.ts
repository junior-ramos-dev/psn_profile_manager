import { ConvertIGame } from "@/models/interfaces";
import { IGamesListData } from "@/models/types/rtkQuery/games";
import { VERBS } from "@/utils/http";
import { createIGameRoutesList } from "@/utils/routes";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const gamesApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGamesListData, string>({
      query: (userId) => ({
        endpointUrl: "games",
        method: VERBS.GET,
        urlParam: userId,
        collection: "Games",
        endpointName: "getGameList",
        headers: {
          ETag: localStorage.getItem("getGameList:etag"),
        },
      }),
      transformResponse: (response) => {
        // Convert response to IGame list
        const gamesList = ConvertIGame.fromApiResponseToIGameList(response);

        // Generate games routes objects from IGame list
        const gamesRoutesList = createIGameRoutesList(gamesList);

        return { gamesList, gamesRoutesList };
      },
      providesTags: ["Games"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGameListQuery } = gamesApi;
