import { ConvertIGame } from "@/models/interfaces";
import { IGamesListData } from "@/models/types/rtkQuery/games";
import { store } from "@/store";
import { VERBS } from "@/utils/restApi";
import { createIGameRoutesList } from "@/utils/routes";

import { rtkQueryBaseApi } from "../base/rtkQueryBaseApi";

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
      }),
      //TODO Create transformResponse for axios
      transformResponse: (response) => {
        const gamesList = ConvertIGame.fromApiResponseToIGameList(
          response.data
        );
        // Extract the value of the "E-Tag" header from the response
        // const eTag = response.headers["etag"];

        // Generate games routes
        const gamesRoutesList = createIGameRoutesList(gamesList);

        // Add gamesList and eTag to persist store
        store.dispatch(
          actionSetGamesList({ gamesList: gamesList, eTag: "eTag" })
        );
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
