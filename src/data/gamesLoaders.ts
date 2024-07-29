import { BaseLoader } from "@/data/common/baseLoader";
import { gamesApi } from "@/redux/games/gamesApi";

export class GamesLoader extends BaseLoader {
  listLoader = async ({ request }) => {
    const games = await this.loader(
      gamesApi.endpoints.getGameList,
      request,
      "",
      {}
    );
    return { games };
  };
}
