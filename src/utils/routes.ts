import { IGame, IGameRoute } from "@/models/interfaces";

//Generate routes for games
export const createIGameRoutesList = (gamesList: IGame[]) => {
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
