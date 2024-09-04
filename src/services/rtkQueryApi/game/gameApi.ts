import { ConvertIGame, IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import {
  IconBinByImgTypeRequest,
  IconBinListRequest,
} from "@/models/types/rtkQuery/games";
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
    getGameIconBin: build.query<IGameIcon, string>({
      query: (npCommunicationId) => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN],
        method: VERBS.GET,
        urlParams: { npCommunicationId },
        collection: "GamesIcons",
        endpointName: GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN,
      }),
      providesTags: ["Game"],
    }),
    getGameIconBinByImgType: build.query<IGameIcon, IconBinByImgTypeRequest>({
      query: ({ npCommunicationId, imgType }) => ({
        endpointUrl:
          GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN_BY_IMG_TYPE],
        method: VERBS.GET,
        urlParams: { npCommunicationId, imgType },
        collection: "GamesIcons",
        endpointName: GAME_ENDPOINT_NAME.GET_GAME_ICON_BIN_BY_IMG_TYPE,
      }),
      providesTags: ["Game"],
    }),
    getGamesIconBinList: build.mutation<IGameIcon[], IconBinListRequest>({
      query: ({ npCommIdList, imgType }) => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_GAMES_ICON_BIN_LIST],
        method: VERBS.POST,
        bodyData: { npCommIdList, imgType },
        collection: "GamesIcons",
        endpointName: GAME_ENDPOINT_NAME.GET_GAMES_ICON_BIN_LIST,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGameListQuery,
  useGameListLoaderQuery,
  useGetGameIconBinQuery,
  useGetGameIconBinByImgTypeQuery,
  useGetGamesIconBinListMutation,
} = gameApi;
