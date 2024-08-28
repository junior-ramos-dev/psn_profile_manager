import { ConvertIGame, IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { GameIconBinListRequest } from "@/models/types/rtkQuery/games";
import { DUMMY_ETAG_HEADER, HEADERS, VERBS } from "@/settings/app/constants";
import { createIGameRoutesList } from "@/settings/app/routes/gameRoutes";
import { store } from "@/store";
import { getEnpointHeader } from "@/utils/http";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutes } from "./gameSlice";
import { GAME_ENDPOINT_NAME, GAME_URL_MAP } from ".";

export const gameApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGame[], void>({
      query: () => ({
        endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GET_GAME_LIST],
        method: VERBS.LIST,
        // urlParam: userId,
        collection: "Games",
        endpointName: GAME_ENDPOINT_NAME.GET_GAME_LIST,
        headers: {
          ETag:
            getEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.ETAG) ??
            DUMMY_ETAG_HEADER,
          "if-none-match":
            getEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.ETAG) ??
            DUMMY_ETAG_HEADER,
        },
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
        urlParam: npCommunicationId,
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
  useGetIconBinByGameQuery,
  useGetIconBinByGameIdsMutation,
} = gameApi;
