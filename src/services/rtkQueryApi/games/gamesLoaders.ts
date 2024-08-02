import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/common/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  gamesListLoader = async ({ request }) => {
    const serverUp = await isServerUp();
    if (serverUp) {
      const gamesListLoaderRes = await this.loader(
        gamesApi.endpoints.getGameList,
        request,
        "",
        {}
      );
      return gamesListLoaderRes;
    } else {
      //If server is offline retrieve data persisted on localstorage;
      const gamesList = this.store.getState().games.gamesList;
      const eTag = this.store.getState().games.eTag;
      return { gamesList, eTag };
    }
  };
}
