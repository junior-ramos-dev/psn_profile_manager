import { isServerUp } from "@/services/axios/axiosInstance";
import { BaseLoader } from "@/services/rtkQueryApi/common/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";
import { IGamesInitialState } from "./gamesSlice";
export class GamesLoader extends BaseLoader {
  getGameState = () => this.state.games as IGamesInitialState;

  gamesListLoader = async () => {
    const serverUp = await isServerUp();
    if (serverUp) {
      const gamesListLoaderRes = await this.loader(
        gamesApi.endpoints.getGameList,
        undefined,
        {},
        {}
      );
      return gamesListLoaderRes;
    } else {
      //If server is offline retrieve data persisted on localstorage;
      const gamesList = this.getGameState().gamesList;
      const eTag = this.getGameState().eTag;
      return { gamesList, eTag };
    }
  };
}
