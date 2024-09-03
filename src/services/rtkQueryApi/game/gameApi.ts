import { ConvertIGame, IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { GameIconBinListRequest } from "@/models/types/rtkQuery/games";
import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { VERBS } from "@/settings/app/constants";
import {
  GAME_ENDPOINT_NAME,
  GAME_URL_MAP,
} from "@/settings/app/constants/api/game";
import { createIGameRoutesList } from "@/settings/app/routes/gameRoutes";
import { store } from "@/store";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutes } from "./gameSlice";

export const gameApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGame[], void>({
      query: () => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_GAME_LIST],
        method: VERBS.LIST,
        collection: "Games",
        endpointName: GAME_ENDPOINT_NAME.GET_GAME_LIST,
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
    // Used by GameLoaders
    gameListLoader: build.query<IGame[], IAxiosBaseQueryArgs>({
      query: ({ endpointUrl, method, collection, endpointName }) => ({
        endpointUrl: endpointUrl,
        method: method,
        collection: collection,
        endpointName: endpointName,
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
    getIconBinByGame: build.query<IGameIcon, string>({
      query: (npCommunicationId) => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME],
        method: VERBS.GET,
        urlParams: { npCommunicationId },
        collection: "GamesIcons",
        endpointName: GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME,
      }),
      providesTags: ["Game"],
    }),
    getIconBinByGameIds: build.mutation<IGameIcon[], GameIconBinListRequest>({
      query: ({ npCommIdList }) => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME_IDS],
        method: VERBS.POST,
        bodyData: { npCommIdList },
        collection: "GamesIcons",
        endpointName: GAME_ENDPOINT_NAME.GET_ICON_BIN_BY_GAME_IDS,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGameListQuery,
  useGameListLoaderQuery,
  useGetIconBinByGameQuery,
  useGetIconBinByGameIdsMutation,
} = gameApi;
