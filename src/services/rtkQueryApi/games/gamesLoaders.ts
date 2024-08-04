import { IGamesListData } from "@/models/types/rtkQuery/games";
import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/base/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  gamesListLoader = async ({ params, request }) => {
    const serverUp = await isServerUp();
    if (serverUp) {
      const authUser = this.store.getState().auth.user;
      const gamesListLoaderRes = await this.loader(
        gamesApi.endpoints.getGameList,
        request,
        (params.userId = authUser.id)
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
