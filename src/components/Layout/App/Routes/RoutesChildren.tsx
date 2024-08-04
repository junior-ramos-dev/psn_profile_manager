import { Route, Routes, useLoaderData } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IAppRoute, IGameRoute } from "@/models/interfaces";
import { IGamesListData } from "@/models/types/rtkQuery/games";
import { GameDetail } from "@/pages/Game";
import { IndexPage } from "@/pages/IndexPage";
import { Login, Register } from "@/pages/SignUp";
import { authSelectors } from "@/services/rtkQueryApi/auth";
import { appRoutes } from "@/settings/app";

import { PrivateRoute,PublicRoute } from ".";

export const RoutesChildren = () => {
  const isLoggedIn = useAppSelector(authSelectors.getLoggedIn);
  const authUser = useAppSelector(authSelectors.getAuthUser);

  const { gamesList, gamesRoutesList } = useLoaderData() as IGamesListData;

  const addSideBarRoute = (route: IAppRoute) => {
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
        {appRoutes.map((appRoute: IAppRoute) => {
          if (appRoute.key === "router-game") {
            appRoute.path = `/games/${authUser.id}`;
            appRoute.enabled = isLoggedIn;
          }

          return appRoute.subRoutes
            ? appRoute.subRoutes.map((item: IAppRoute) => addSideBarRoute(item))
            : addSideBarRoute(appRoute);
        })}
        {/* Create Games Routes */}
        {gamesRoutesList.map((gameRoute: IGameRoute, index: number) =>
          addGameRoute(gameRoute, index)
        )}
      </Route>
    </Routes>
  );
};
