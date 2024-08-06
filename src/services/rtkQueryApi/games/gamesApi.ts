import { ConvertIGame } from "@/models/interfaces";
import { IGamesListData } from "@/models/types/rtkQuery/games";
import { store } from "@/store";
import { VERBS } from "@/utils/http";
import { createIGameRoutesList } from "@/utils/routes";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutesList } from "./gamesSlice";

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
          // Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        // Convert response to IGame list
        const gamesList = ConvertIGame.fromApiResponseToIGameList(response);

        // Generate games routes objects from IGame list
        const gamesRoutesList = createIGameRoutesList(gamesList);

        //TODO Move actions to component
        // Add gamesList and eTag to persist store
        store.dispatch(actionSetGamesList(gamesList));
        // Add gamesRoutes to persist store
        store.dispatch(actionSetGamesRoutesList(gamesRoutesList));

        // Return an object containing the parsed response data and the token value
        return { gamesList, gamesRoutesList };
      },
      providesTags: ["Games"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGameListQuery } = gamesApi;
