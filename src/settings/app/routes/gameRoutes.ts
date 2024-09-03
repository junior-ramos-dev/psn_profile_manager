import { IGame, IGameRoute } from "@/models/interfaces";

/**
 *  Generate IGameRoute list objects from IGame list
 */
export const createIGameRoutesList = (gameList: IGame[]): IGameRoute[] => {
  const gamesRoutesList = new Array<IGameRoute>();

  gameList.forEach((game) => {
    const gameRoute: IGameRoute = {
      key: game.npCommunicationId,
      title: game.trophyTitleName,
      tooltip: game.trophyTitleName,
      path: "/game/" + game.npCommunicationId,
      enabled: true,
      appendDivider: true,
      expanded: false,
    };

    gamesRoutesList.push(gameRoute);
  });

  return gamesRoutesList;
};
