import { createBrowserRouter, RouteObject } from "react-router-dom";

import { LayoutIndex } from "@/ui/components/Layout/App/LayoutIndex";
import { PrivateRoute, PublicRoute } from "@/ui/components/Layout/App/Routes";
import AxiosError from "@/ui/pages/Error/AxiosError";
import RouteError from "@/ui/pages/Error/RouteError";
import Index from "@/ui/pages/Index";
import Settings from "@/ui/pages/Settings";
import Login from "@/ui/pages/SignUp/Login";
import RegisterLoader from "@/ui/pages/SignUp/RegisterLoader";

export const enum ROUTE_ID {
  ROOT = "root",
  INDEX = "index",
  PUBLIC_ROUTE = "publicRoute",
  PRIVATE_ROUTE = "privateRoute",
}

export const enum ROUTE_PATH {
  ROOT = "/",
  INDEX = "/index",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  SETTINGS = "/settings",
  AXIOS_ERROR = "/axioserror",
}

export const appDefaultRoutes = [
  {
    id: ROUTE_ID.ROOT,
    path: ROUTE_PATH.ROOT,
    element: <LayoutIndex />,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <AxiosError />,
        children: [
          {
            path: ROUTE_PATH.AXIOS_ERROR,
            element: <AxiosError />,
          },
          {
            path: ROUTE_PATH.SETTINGS,
            element: <Settings />,
          },
          {
            id: ROUTE_ID.PUBLIC_ROUTE,
            element: <PublicRoute />,
            errorElement: <RouteError />,
            children: [
              {
                id: ROUTE_ID.INDEX,
                index: true,
                path: ROUTE_PATH.INDEX,
                element: <Index />,
              },
              {
                path: ROUTE_PATH.LOGIN,
                element: <Login />,
              },
              {
                path: ROUTE_PATH.REGISTER,
                element: <RegisterLoader />,
              },
            ],
          },
          {
            id: ROUTE_ID.PRIVATE_ROUTE,
            element: <PrivateRoute />,
            errorElement: <RouteError />,
            children: [] as RouteObject[], //_.concat(sidebarRoutes, gamesRoutes),
          },

          // element: <RoutesChildren gamesRoutes={gamesRoutesParams} />,
          // loader: gamesLoader.initGamesListLoader,
          // loader: async () => {
          //   const p = store.dispatch(
          //     gameApi.endpoints.getGameList({request: "/6690ec7a1b9af84a84b0b425"})
          //   );
          //   const response = await p.unwrap();
          //   console.log(response.gamesList[0]);

          // },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(appDefaultRoutes);
