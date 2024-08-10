import { RouteObject } from "react-router-dom";

import { IGame, IGameRoute } from "@/models/interfaces";
import { GameDetail } from "@/pages/Game";
import { store } from "@/store";

// Hook used to load games routes into initRouter.tsx
export const useGamesRouter = () => {
  return createGamesRouteObjectList();
};

/**
 *  Generate IGameRoute list objects from IGame list
 */
export const createIGameRoutesList = (gamesList: IGame[]): IGameRoute[] => {
  const iGamesRoutesList = new Array<IGameRoute>();

  gamesList.forEach((game) => {
    const gameRoute: IGameRoute = {
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
export const createGamesRouteObjectList = (): RouteObject[] => {
  const gamesList = store.getState().games.gamesList;
  let gamesRoutesList = [];

  // List of RoutObject
  const gameRouteObjectList: RouteObject[] = [];

  if (gamesList) {
    // Get the IRouteGame list
    gamesRoutesList = createIGameRoutesList(gamesList);

    // Iterate over the gamesRoutesParams to add the games list page routes
    gamesRoutesList.forEach((gameRoute: IGameRoute) => {
      gameRouteObjectList.push(addGameRouteObject(gameRoute));
    });
  }

  return gameRouteObjectList;
};
