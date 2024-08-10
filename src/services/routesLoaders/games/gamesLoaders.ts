import { IGame } from "@/models/interfaces";
import { isServerUp } from "@/services/axios/axiosApiConfig";
import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

export class GamesLoader extends BaseLoader {
  listLoader = async ({ params, request }) => {
    return await this.loader(
      gamesApi.endpoints.getGameList,
      request,
      params.userId,
      {}
    );
  };

  initListLoader = async () => {
    const serverUp = await isServerUp();
    const authUser = this.store.getState().auth.user;

    if (serverUp && authUser.id) {
      const promise = this.dispatch(
        gamesApi.endpoints.getGameList.initiate(authUser.id)
      );
      try {
        // wait for data to be there
        const response = await promise;
        if (!response.isError) {
          return response.data as IGame[];
        } else {
          return this.store.getState().games.gamesList as IGame[];
        }
      } catch (error) {
        console.log(error);
      } finally {
        promise.unsubscribe(); // remove the subscription. The data will stay in cache for 60 seconds and the component can subscribe to it in that timeframe.
      }
    } else {
      //If server is offline retrieve data persisted on localstorage;
      return this.store.getState().games.gamesList as IGame[];
    }
  };
}
