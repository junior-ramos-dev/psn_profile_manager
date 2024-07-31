import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/common/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  listLoader = async ({ request }) => {
    const serverUp = await isServerUp();
    if (serverUp) {
      const games = await this.loader(
        gamesApi.endpoints.getGameList,
        request,
        "",
        {}
      );

      return games;
    } else {
      //If server is offline retrieve data persisted on localstorage;
      const gamesList = this.store.getState().games.gamesList;
      return gamesList;
    }
  };
}
