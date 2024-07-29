import { Routes, Route, useLoaderData } from "react-router-dom";

import { DefaultRoute, ProtectedRoute } from "@/components/Navigation/Routes";
import { PageDefault } from "../../PageDefault";

import { Login, Register } from "@/pages/SignUp";
import { IAppRoute, IGameRoute } from "@/models/interfaces";

import { useGetGameListQuery } from "@/redux/games/gamesApi";
import { createIGameRouteList } from "@/utils/routes";

//TODO Ceck if needs persist to DB
import { routes as appRoutes } from "@/config/routes";
import { getIGamesFromLocalStorage } from "@/utils/localStorage";
import { GameDetail } from "@/pages/Game";

export const RoutesChildren = () => {
  const { data: games } = useGetGameListQuery("");

  if (games) localStorage.setItem("gamesList", JSON.stringify(games));

  const localGamesList = getIGamesFromLocalStorage();

  const gamesRoutes = createIGameRouteList(localGamesList);

  const addRoute = (route: IAppRoute) => {
    return (
      <Route
        key={route.key}
        path={route.path}
        Component={route.component || PageDefault}
      />
    );
  };

  const addGameRoute = (route: IGameRoute, index: number) => {
    return (
      <Route
        key={route.key}
        path={route.path}
        element={<GameDetail gameDetail={route.props} />}
      />
    );
  };

  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        {/* Create App Routes */}
        {appRoutes.map((appRoute: IAppRoute) =>
          appRoute.subRoutes
            ? appRoute.subRoutes.map((item: IAppRoute) => addRoute(item))
            : addRoute(appRoute)
        )}
        {/* Create Games Routes */}
        {gamesRoutes.map((gameRoute: IGameRoute, index: number) =>
          addGameRoute(gameRoute, index)
        )}
      </Route>
    </Routes>
  );
};
