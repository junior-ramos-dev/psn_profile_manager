import { useState } from "react";
import { RouteObject, RouterProvider } from "react-router-dom";

import { IGameRoute } from "./models/interfaces";
import { GameDetail } from "./pages/Game";
import { useAppRouter } from "./settings/app/routes/appRoutes";
import { getRouter } from "./initRouter";
import { store } from "./store";

export const App = () => {
  const sidebarRoutes = useAppRouter();

  // Add routes for the games list
  const addGameRouteObject = (gameRoute: IGameRoute): RouteObject => {
    const gameRouteObject: RouteObject = {
      id: gameRoute.key,
      path: gameRoute.path,
      element: <GameDetail gameId={gameRoute.key} />,
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

  const gamesRoutesObj = createGamesRouteObjectList();

  const [gamesRoutes, setGamesRoutes] = useState(gamesRoutesObj);

  // Load the gems routes
  if (!gamesRoutes.length) {
    setTimeout(() => {
      if (!gamesRoutes.length) {
        console.log("Loading games routes...");

        setGamesRoutes(createGamesRouteObjectList());
      }
    }, 300);
  }

  const router = getRouter(sidebarRoutes, gamesRoutes);

  return <RouterProvider router={router} />;
};
