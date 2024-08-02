import { rtkQueryBaseApi } from "../common/rtkQueryBaseApi";
import { IGame } from "@/models/interfaces";
import { VERBS } from "@/utils/restApi";

interface IGetGamesListResponse {
  gamesList: IGame[];
  eTag: string;
}

export const gamesApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameList: build.query<IGetGamesListResponse, void>({
      query: () => ({ url: "/games", method: VERBS.GET, data: {} }),
      transformResponse: (response) => {
        const gamesList = response.data;
        // Extract the value of the "E-Tag" header from the response
        const eTag = response.headers["etag"];

        // Return an object containing the parsed response data and the token value
        return { gamesList, eTag };
      },
      providesTags: ["Games"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGameListQuery } = gamesApi;
