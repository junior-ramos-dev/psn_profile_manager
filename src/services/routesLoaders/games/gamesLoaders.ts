import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gameApi } from "@/services/rtkQueryApi/game/gameApi";
import { VERBS } from "@/settings/app/constants";
import {
  GAME_ENDPOINT_NAME,
  GAME_URL_MAP,
} from "@/settings/app/constants/api/game";

export class GamesLoader extends BaseLoader {
  listLoader = async ({ request }) => {
    const games = await this.loader(
      GAME_ENDPOINT_NAME.GAME_LIST_LOADER,
      gameApi.endpoints.gameListLoader,
      request,
      this.getGamesListLoaderQuery(),
      {}
    );
    return games;
  };

  getGamesListLoaderQuery = (): IAxiosBaseQueryArgs => {
    return {
      endpointUrl: GAME_URL_MAP[GAME_ENDPOINT_NAME.GAME_LIST_LOADER],
      method: VERBS.LIST,
      collection: "Games",
      endpointName: GAME_ENDPOINT_NAME.GAME_LIST_LOADER,
    };
  };
}
