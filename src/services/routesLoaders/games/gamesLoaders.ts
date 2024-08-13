import { BaseLoader } from "@/services/routesLoaders/baseLoader";
import { gameApi } from "@/services/rtkQueryApi/game/gameApi";
import { AppStore } from "@/store";

export class GamesLoader extends BaseLoader {
  delay: number;
  exec: number;

  constructor(store: AppStore, delay: number) {
    super(store);
    this.delay = delay;
    this.exec = Date.now();
  }

  listLoader = async ({ params, request }) => {
    const currentTime = Date.now();

    if (currentTime >= this.exec + this.delay) {
      this.exec = Date.now();
      this.delay = 60 * 60 * 1000;

      return await this.loader(
        "getGameList",
        gameApi.endpoints.getGameList,
        request,
        params.userId,
        {}
      );
    } else {
      return null;
    }
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
