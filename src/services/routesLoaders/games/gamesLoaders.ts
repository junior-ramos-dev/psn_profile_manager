import { IGamesListData } from "@/models/types/rtkQuery/games";
import { isServerUp } from "@/services/axios/axiosApiConfig";
import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  gamesListLoader = async ({ params, request }) => {
    const gamesListLoaderRes = await this.loader(
      gamesApi.endpoints.getGameList,
      request,
      params.userId
    );
    return gamesListLoaderRes as IGamesListData;
  };

  initGamesListLoader = async () => {
    const serverUp = await isServerUp();
    const authUser = this.store.getState().auth.user;
    console.log(authUser.id);
    if (serverUp && authUser.id) {
      const promise = this.dispatch(
        gamesApi.endpoints.getGameList.initiate(authUser.id)
      );
      try {
        // wait for data to be there
        const response = await promise;
        return response.data as IGamesListData;
      } catch (error) {
        console.log(error);
      } finally {
        promise.unsubscribe(); // remove the subscription. The data will stay in cache for 60 seconds and the component can subscribe to it in that timeframe.
      }
    } else {
      //If server is offline retrieve data persisted on localstorage;
      const gamesList = this.store.getState().games.gamesList;
      const gamesRoutesList = this.store.getState().games.gamesRoutesList;

      return { gamesList, gamesRoutesList } as IGamesListData;
    }
  };
}
