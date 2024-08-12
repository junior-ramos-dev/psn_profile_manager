import { ConvertIGame, IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { GameIconBinListRequest } from "@/models/types/rtkQuery/games";
import { createIGameRoutesList } from "@/settings/app/routes/gamesRoutes";
import { store } from "@/store";
import { VERBS } from "@/utils/http";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetGamesList, actionSetGamesRoutes } from "./gamesSlice";

export const gamesApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGame[], string>({
      query: (userId) => ({
        endpointUrl: "games",
        method: VERBS.GET,
        urlParam: userId,
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
      providesTags: ["Games"],
    }),
    getIconBinByGame: build.query<IGameIcon, string>({
      query: (npCommunicationId) => ({
        endpointUrl: "games/icon",
        method: VERBS.GET,
        urlParam: npCommunicationId,
        collection: "GamesIcons",
        endpointName: "getIconBinByGame",
      }),
      providesTags: ["Games"],
    }),
    getIconBinByGameIds: build.mutation<IGameIcon[], GameIconBinListRequest>({
      query: ({ npCommIdList }) => ({
        endpointUrl: "games/icon/list",
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
} = gamesApi;
