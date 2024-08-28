import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gameApi } from "@/services/rtkQueryApi/game/gameApi";

//TODO Check set games:etag
export class GamesLoader extends BaseLoader {
  listLoader = async ({ request }) => {
    const games = await this.loader(
      "getGameList",
      gameApi.endpoints.getGameList,
      request,
      {},
      {}
    );
    return games;
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
