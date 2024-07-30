import { BaseLoader } from "@/services/rtkQueryApi/common/baseLoader";
import { gamesApi } from "@/services/rtkQueryApi/games/gamesApi";

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
