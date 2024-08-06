import { Route, Routes } from "react-router-dom";

import { Loading } from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IAppRoute, IGame, IGameRoute } from "@/models/interfaces";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { GameDetail } from "@/pages/Game";
import { IndexPage } from "@/pages/IndexPage";
import { Login, Register } from "@/pages/SignUp";
import { authSelectors } from "@/services/rtkQueryApi/auth";
import { gamesSelectors } from "@/services/rtkQueryApi/games";
import { useGetGameListQuery } from "@/services/rtkQueryApi/games/gamesApi";
import {
  actionSetGamesList,
  actionSetGamesRoutesList,
} from "@/services/rtkQueryApi/games/gamesSlice";
import { appRoutes } from "@/settings/app";

import { PrivateRoute, PublicRoute } from ".";

export const RoutesChildren = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(authSelectors.getLoggedIn);
  const authUser = useAppSelector(authSelectors.getAuthUser);

  // const gamesList = useAppSelector(gamesSelectors.getGamesList);
  const gamesRoutesList = useAppSelector(gamesSelectors.getGamesRoutesList);

  const { data, isLoading, isError, isSuccess } = useGetGameListQuery(
    authUser.id,
    {
      pollingInterval: 60 * 60 * 1000 * 2, //60 * 60 * 1000 * 2 = 2h
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  if (isLoading) return <Loading />;

  // if (isError) return <ErrorPage />;

  if (data) {
    // Add gamesList and eTag to persist store
    dispatch(actionSetGamesList(data.gamesList));
    // Add gamesRoutesList to persist store
    dispatch(actionSetGamesRoutesList(data.gamesRoutesList));
  }

  const addSideBarRoute = (route: IAppRoute) => {
    return (
      <Route
        key={route.key}
        path={route.path}
        Component={route.component || IndexPage}
      />
    );
  };

  const addGameRoute = (route: IGameRoute) => {
    return (
      <Route
        key={route.key}
        path={route.path}
        element={<GameDetail gameDetail={route.props as IGame} />}
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
        {gamesRoutesList.map((gameRoute: IGameRoute) =>
          addGameRoute(gameRoute)
        )}
      </Route>
    </Routes>
  );
};
