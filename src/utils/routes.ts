import { IGame, IGameRoute } from "@/models/interfaces";
import { formatStringToTitleCase } from "@/utils/strings";

//Generate routes for games
export const createIGameRouteList = (gamesList: IGame[]) => {
  gamesList.forEach((game) => {
    let item: IGame = game;
    if (item.trophyTitleDetail) formatStringToTitleCase(item.trophyTitleDetail);
    if (item.trophyTitleName) formatStringToTitleCase(item.trophyTitleName);
  });

  const iGamesRoutesList = new Array<IGameRoute>();

  gamesList.map((game) => {
    let gameRoute: IGameRoute = {
      key: game.npCommunicationId,
      title: game.trophyTitleName,
      tooltip: game.trophyTitleName,
      path: "/games/" + game.npCommunicationId,
      props: game,
      enabled: true,
      appendDivider: true,
      expanded: false,
    };

    iGamesRoutesList.push(gameRoute);
  });

  return iGamesRoutesList;
};
