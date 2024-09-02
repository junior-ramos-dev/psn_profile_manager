import { ConvertIGame, IGame } from "@/models/interfaces";
import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { createIGameRoutesList } from "@/settings/app/routes/gameRoutes";
import { store } from "@/store";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutes } from "./gameSlice";

export const gameApiLoader = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    gameListLoader: build.query<IGame[], IAxiosBaseQueryArgs>({
      query: ({ endpointUrl, method, collection, endpointName, headers }) => ({
        endpointUrl: endpointUrl,
        method: method,
        collection: collection,
        endpointName: endpointName,
        headers: headers,
      }),
      transformResponse: (response) => {
        // Convert response to IGame list
        const gamesList = ConvertIGame.fromApiResponseToIGameList(
          response.games
        );
        store.dispatch(actionSetGamesList(gamesList));

        // Get the IRouteGame list
        const gamesRoutes = createIGameRoutesList(gamesList);
        store.dispatch(actionSetGamesRoutes(gamesRoutes));

        return gamesList;
      },
      providesTags: ["Game"],
    }),
  }),
  overrideExisting: false,
});

export const { useGameListLoaderQuery } = gameApiLoader;
