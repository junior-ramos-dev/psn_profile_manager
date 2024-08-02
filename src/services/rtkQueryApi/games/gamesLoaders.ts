import { IGame } from "@/models/interfaces";
import { IGamesListData } from "@/models/types/rtkQuery/games";
import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/common/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  gamesListLoader = async () => {
    const serverUp = await isServerUp();
    if (serverUp) {
      const gamesListLoaderRes = await this.loader(
        gamesApi.endpoints.getGameList,
        undefined,
        {},
        {}
      );
      return gamesListLoaderRes as IGamesListData;
    } else {
      //If server is offline retrieve data persisted on localstorage;
      const gamesList = this.store.getState().games.gamesList;
      const gamesRoutesList = this.store.getState().games.gamesRoutesList;

      return { gamesList, gamesRoutesList } as IGamesListData;
    }
  };
}
