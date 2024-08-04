import { IGamesListData } from "@/models/types/rtkQuery/games";
import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/base/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";
import { store } from "@/store";

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
    if (serverUp) {
      const authUser = this.store.getState().auth.user;
      console.log(authUser.id);
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
    }
  };
}
