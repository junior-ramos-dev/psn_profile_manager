import { rtkQueryBaseApi } from "../common/rtkQueryBaseApi";
import { VERBS } from "@/utils/restApi";
import { actionSetGamesList, actionSetGamesRoutesList } from "./gamesSlice";
import { store } from "@/store";
import { createIGameRouteList } from "@/utils/routes";
import { IGamesListData } from "@/models/types/rtkQuery/games";

export const gamesApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGamesListData, void>({
      query: () => ({ url: "/games", method: VERBS.GET, data: {} }),
      transformResponse: (response) => {
        const gamesList = response.data;
        // Extract the value of the "E-Tag" header from the response
        const eTag = response.headers["etag"];

        // Generate games routes
        const gamesRoutesList = createIGameRouteList(gamesList);

        // Add gamesList and eTag to persist store
        store.dispatch(
          actionSetGamesList({ gamesList: gamesList, eTag: eTag })
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
