import { Routes, Route, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  actionSetGamesList,
  actionSetGamesRoutesList,
} from "@/services/rtkQueryApi/games/gamesSlice";
import { authSelectors } from "@/services/rtkQueryApi/auth";
import { useAppSelector } from "@/hooks/redux";
import { appRoutes } from "@/settings/app";
import { createIGameRouteList } from "@/utils/routes";

import { GameDetail } from "@/pages/Game";
import { Login, Register } from "@/pages/SignUp";
import { IndexPage } from "@/pages/IndexPage";
import { PublicRoute, PrivateRoute } from ".";

import { IAppRoute, IGame, IGameRoute } from "@/models/interfaces";

export const RoutesChildren = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(authSelectors.getLoggedIn);

  const { gamesList, eTag } = useLoaderData();
  const gamesRoutes = createIGameRouteList(gamesList);

  // Add gamesList and gamesRoutes to persist store
  dispatch(actionSetGamesList({ gamesList: gamesList, eTag: eTag }));
  dispatch(actionSetGamesRoutesList(gamesRoutes));

  const addRoute = (route: IAppRoute) => {
    return (
      <Route
        key={route.key}
        path={route.path}
        Component={route.component || IndexPage}
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
      <Route element={<PublicRoute isLoggedIn={isLoggedIn} />}>
        <Route index element={<IndexPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
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
