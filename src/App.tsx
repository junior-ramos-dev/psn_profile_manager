import { useState } from "react";
import _ from "lodash";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { IGameRoute } from "./models/interfaces";
import { GameDetail } from "./pages/Game";
import { useAppRouter } from "./settings/app/routes/sideBarRoutes";
import { appDefaultRoutes, ROUTE_ID } from "./initAppRouter";
import { store } from "./store";

export const App = (appRouter) => {
  const isLoggedIn = store.getState().auth.isLoggedIn;
  const sidebarRoutes = useAppRouter();

  // console.log(isLoggedIn);

  /**
   * Set the private routes children from the appDefaultroutes
   *
   * @param appDefaultRoutes
   * @param sidebarRoutes
   * @param gamesRoutes
   */
  const setPrivateRoutes = (appDefaultRoutes, sidebarRoutes, gamesRoutes) => {
    appDefaultRoutes.forEach((root) => {
      root.children.forEach((rootChildren) => {
        const subRootChildren = rootChildren.children;
        subRootChildren.forEach((subRoute) => {
          if (subRoute.id === ROUTE_ID.PRIVATE_ROUTE) {
            subRoute.children = _.concat(sidebarRoutes, gamesRoutes);
          }
        });
      });
    });
  };

  /**
   * Add routes for the games list
   *
   * @param gameRoute
   * @returns
   */
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
  if (!gamesRoutes.length && isLoggedIn) {
    setTimeout(() => {
      if (!gamesRoutes.length) {
        console.log("Loading games routes...");

        setGamesRoutes(createGamesRouteObjectList());
      }
    }, 300);
  }

  setPrivateRoutes(appDefaultRoutes, sidebarRoutes, gamesRoutes);
  appRouter = createBrowserRouter(appDefaultRoutes);

  return <RouterProvider router={appRouter} />;
};
