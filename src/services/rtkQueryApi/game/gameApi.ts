import { ConvertIGame, IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { GameIconBinListRequest } from "@/models/types/rtkQuery/games";
import { VERBS } from "@/settings/app/constants";
import { createIGameRoutesList } from "@/settings/app/routes/gameRoutes";
import { store } from "@/store";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutes } from "./gameSlice";

export const gameApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGame[], void>({
      query: () => ({
        endpointUrl: `game/list`,
        method: VERBS.LIST,
        // urlParam: userId,
        collection: "Games",
        endpointName: "getGameList",
        headers: {
          ETag: localStorage.getItem("getGameList:etag") ?? "",
          "if-none-match": localStorage.getItem("getGameList:etag") ?? "",
        },
      }),
      transformResponse: (response) => {
        // Convert response to IGame list
        const gamesList = ConvertIGame.fromApiResponseToIGameList(response);
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
        endpointUrl: "game/icon",
        method: VERBS.GET,
        urlParam: npCommunicationId,
        collection: "GamesIcons",
        endpointName: "getIconBinByGame",
      }),
      providesTags: ["Game"],
    }),
    getIconBinByGameIds: build.mutation<IGameIcon[], GameIconBinListRequest>({
      query: ({ npCommIdList }) => ({
        endpointUrl: "game/icon/list",
        method: VERBS.POST,
        bodyData: { npCommIdList },
        collection: "GamesIcons",
        endpointName: "getIconBinByGameIds",
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
