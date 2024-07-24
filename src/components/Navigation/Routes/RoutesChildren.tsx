import { Routes, Route } from "react-router-dom";

import { DefaultRoute, ProtectedRoute } from "@/components/Navigation/Routes";
import { PageDefault } from "../../PageDefault";

import { Login, Register } from "@/pages/SignUp";

import { IAppRoute, IGameRoute } from "@/models/interfaces";

//TODO CHeck if needs persist to DB
import { routes as appRoutes } from "@/config/routes";

//TODO Use when get games from API
import { gamesRoutes } from "@/config/routes";
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
        {appRoutes.map((appRoute: IAppRoute) =>
          appRoute.subRoutes
            ? appRoute.subRoutes.map((item: IAppRoute) => addRoute(item))
            : addRoute(appRoute)
        )}
        {/* Create Games Routes */}
        {gamesRoutes.map((gameRoute: IGameRoute) =>
          gameRoute.subRoutes
            ? gameRoute.subRoutes.map((item: IGameRoute) => addRoute(item))
            : addRoute(gameRoute)
        )}
      </Route>
    </Routes>
  );
};
