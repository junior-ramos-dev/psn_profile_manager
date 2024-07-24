import { Routes, Route } from "react-router-dom";

import { DefaultRoute, ProtectedRoute } from "@/components/Navigation/Routes";
import { PageDefault } from "../../PageDefault";

import { Login, Register } from "@/pages/SignUp";

import { routes as appRoutes } from "@/config/routes";
import { Route as AppRoute } from "@/models/types";

import { gamesRoutes } from "@/config/routes";
import { GameRoute } from "@/models/types/game";

//TODO Use when get games from API
import { GAMES_PARENT_PATH } from "@/utils/constants";
import { GameDetail, Games } from "@/pages/Game";

export const RoutesChildren = () => {
  const addRoute = (
    route: any,
    appendParent?: boolean,
    parentPath?: string
  ) => {
    //TODO Use when get games from API
    if (appendParent) {
      const appendParentPath = (parentPath + route.path).replace(/\/\//g, "/");
      // const routeWithParent = { ...route, path: appendParentPath };
      // console.log(routeWithParent);
    }

    return (
      <Route
        key={route.key}
        path={route.path}
        Component={route.component || PageDefault}
      />
    );
  };

  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        {/* Create App Routes */}
        {appRoutes.map((appRoute: AppRoute) =>
          appRoute.subRoutes
            ? appRoute.subRoutes.map((item: AppRoute) => addRoute(item))
            : addRoute(appRoute)
        )}
        {/* Create Games Routes */}
        {gamesRoutes.map((gameRoute: GameRoute) =>
          gameRoute.subRoutes
            ? gameRoute.subRoutes.map((item: GameRoute) => addRoute(item))
            : addRoute(gameRoute)
        )}
      </Route>
    </Routes>
  );
};
