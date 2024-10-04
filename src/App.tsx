import { useState } from "react";
import _ from "lodash";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { appDefaultRoutes, ROUTE_ID } from "@/AppInitRouterProvider";
import { useAppSelector } from "@/hooks/redux";
import { IGameRoute } from "@/models/interfaces";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectGamesRoutes } from "@/services/rtkQueryApi/game/gameSelectors";
import { useSidebarRoutes } from "@/settings/app/routes/sideBarRoutes";
import { GameDetail } from "@/ui/components/Game";

/**
 * Create game RouteObject from IGameRoute
 *
 * @param gameRoute
 * @returns
 */
const createGameRouteObject = (gameRoute: IGameRoute): RouteObject => {
  const gameRouteObject: RouteObject = {
    id: gameRoute.key,
    path: gameRoute.path,
    element: <GameDetail gameId={gameRoute.key} />,
  };

  return gameRouteObject;
};

/**
 * Generate RouteObject list from IGameRoute list
 *
 * @param gamesRoutesList
 * @returns
 */
const generateGamesRouteObjectList = (
  gamesRoutesList: IGameRoute[]
): RouteObject[] => {
  // List of RoutObject
  const gameRouteObjectList: RouteObject[] = [];

  if (gamesRoutesList) {
    // Iterate over the gamesRoutesParams to add the games list page routes
    gamesRoutesList.forEach((gameRoute: IGameRoute) => {
      gameRouteObjectList.push(createGameRouteObject(gameRoute));
    });
  }

  return gameRouteObjectList;
};

/**
 * Append routes to the appDefaultRoutes
 *
 * @param appDefaultRoutes
 * @param routes
 */
export const appendRoutesToDefaultRoutes = (
  appDefaultRoutes,
  sideBarRoutes,
  gameRoutes
) => {
  appDefaultRoutes.forEach((root) => {
    root.children.forEach((rootChildren) => {
      const subRootChildren = rootChildren.children;
      subRootChildren.forEach((subRoute) => {
        if (subRoute.id === ROUTE_ID.PRIVATE_ROUTE) {
          subRoute.children = _.concat(sideBarRoutes, gameRoutes);
        }
      });
    });
  });
};

export const App = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // Load sidebar routes and set into the default routes
  const sidebarRoutes = useSidebarRoutes();

  // Get gamesROutes from gameSlice
  const gamesRoutesList = useAppSelector(selectGamesRoutes);
  // Create games routes objects to set into the default routes
  const gamesRoutesObj = generateGamesRouteObjectList(gamesRoutesList);

  // Init gamesRoutes state with games routes objects
  const [gamesRoutes, setGamesRoutes] = useState(gamesRoutesObj);

  // Try to setup the games routes if they are not got from the gameLoader when the app starts
  if (!gamesRoutes.length && isLoggedIn) {
    setTimeout(() => {
      if (!gamesRoutes.length) {
        console.log("Loading games routes...");

        setGamesRoutes(generateGamesRouteObjectList(gamesRoutesList));
      }
    }, 300);
  }

  // Append routes into the default routes
  appendRoutesToDefaultRoutes(appDefaultRoutes, sidebarRoutes, gamesRoutes);

  // Update the default routes with sidebar/games routes
  const appendedRouter = createBrowserRouter(appDefaultRoutes);

  return <RouterProvider router={appendedRouter} />;
};
