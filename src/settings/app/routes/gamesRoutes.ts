import { RouteObject } from "react-router-dom";

import { IGame, IGameRoute } from "@/models/interfaces";
import { GameDetail } from "@/pages/Game";
import { store } from "@/store";

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

// Add routes for the games list
const addGameRouteObject = (gameRoute: IGameRoute): RouteObject => {
  const gameRouteObject: RouteObject = {
    id: gameRoute.key,
    path: gameRoute.path,
    element: GameDetail({ gameId: gameRoute.key }),
  };

  return gameRouteObject;
};

/**
 *  Generate RouteObject list from IGameRoute list
 */
const createGamesRouteObjectList = (): RouteObject[] => {
  const gamesRoutes = store.getState().game.gamesRoutes;
  // let gamesRoutesList = [];

  // List of RoutObject
  const gameRouteObjectList: RouteObject[] = [];

  if (gamesRoutes) {
    // Iterate over the gamesRoutesParams to add the games list page routes
    gamesRoutes.forEach((gameRoute: IGameRoute) => {
      gameRouteObjectList.push(addGameRouteObject(gameRoute));
    });
  }

  return gameRouteObjectList;
};

export { createGamesRouteObjectList, createIGameRoutesList };
