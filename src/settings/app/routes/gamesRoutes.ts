import { IGame, IGameRoute } from "@/models/interfaces";

/**
 *  Generate IGameRoute list objects from IGame list
 */
const createIGameRoutesList = (gamesList: IGame[]): IGameRoute[] => {
  const iGamesRoutesList = new Array<IGameRoute>();

  gamesList.forEach((game) => {
    const gameRoute: IGameRoute = {
      key: game.npCommunicationId,
      title: game.trophyTitleName,
      tooltip: game.trophyTitleName,
      path: "/game/" + game.npCommunicationId,
      enabled: true,
      appendDivider: true,
      expanded: false,
    };

    iGamesRoutesList.push(gameRoute);
  });

  return iGamesRoutesList;
};

export { createIGameRoutesList };
