import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gameApiLoader } from "@/services/rtkQueryApi/game/gameApiLoader";
import { DUMMY_ETAG_HEADER, HEADERS, VERBS } from "@/settings/app/constants";
import {
  GAME_ENDPOINT_NAME,
  GAME_LOADER_ENDPOINT_NAME,
  GAME_LOADER_URL_MAP,
} from "@/settings/app/constants/api";
import { getEnpointHeader } from "@/utils/http";

export class GamesLoader extends BaseLoader {
  listLoader = async ({ request }) => {
    const games = await this.loader(
      GAME_LOADER_ENDPOINT_NAME.GAME_LIST_LOADER,
      gameApiLoader.endpoints.gameListLoader,
      request,
      this.getGamesListLoaderQuery(),
      {}
    );
    return games;
  };

  getGamesListLoaderQuery = (): IAxiosBaseQueryArgs => {
    return {
      endpointUrl:
        GAME_LOADER_URL_MAP[GAME_LOADER_ENDPOINT_NAME.GAME_LIST_LOADER],
      method: VERBS.LIST,
      collection: "Games",
      endpointName: GAME_LOADER_ENDPOINT_NAME.GAME_LIST_LOADER,
      headers: {
        ETag:
          getEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.ETAG) ??
          DUMMY_ETAG_HEADER,
        "if-none-match":
          getEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.ETAG) ??
          DUMMY_ETAG_HEADER,
      },
    };
  };

  // initListLoader = async () => {
  //   const serverUp = await isServerUp();
  //   const authUser = this.store.getState().auth.user;

  //   if (serverUp && authUser.id) {
  //     const promise = this.dispatch(
  //       gameApi.endpoints.getGameList.initiate(authUser.id)
  //     );
  //     try {
  //       // wait for data to be there
  //       const response = await promise;
  //       if (!response.isError) {
  //         return response.data as IGame[];
  //       } else {
  //         return this.store.getState().game.gamesList as IGame[];
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       promise.unsubscribe(); // remove the subscription. The data will stay in cache for 60 seconds and the component can subscribe to it in that timeframe.
  //     }
  //   } else {
  //     //If server is offline retrieve data persisted on localstorage;
  //     return this.store.getState().game.gamesList as IGame[];
  //   }
  // };
}
