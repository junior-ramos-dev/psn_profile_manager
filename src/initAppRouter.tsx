import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

import { AppLayout } from "@/components/Layout/App";
import { PrivateRoute, PublicRoute } from "@/components/Layout/App/Routes";
import { IndexPage } from "@/pages/IndexPage";
import { Login, Register } from "@/pages/SignUp";

import { AxiosErrorPage } from "./pages/Error/Axios/AxiosErrorPage";
import { RouteErrorPage } from "./pages/Error/RouteErrorPage";

export const enum ROUTE_ID {
  ROOT = "root",
  INDEX = "index",
  PUBLIC_ROUTE = "publicRoute",
  PRIVATE_ROUTE = "privateRoute",
}

export const appDefaultRoutes = [
  {
    id: ROUTE_ID.ROOT,
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { id: ROUTE_ID.INDEX, index: true, element: <IndexPage /> },

          {
            id: ROUTE_ID.PUBLIC_ROUTE,
            element: <PublicRoute />,
            errorElement: <RouteErrorPage />,
            children: [
              {
                path: "/auth/login",
                element: <Login />,
              },
              {
                path: "/auth/register",
                element: <Register />,
              },
              {
                path: "/axios-error-page",
                element: <AxiosErrorPage />,
              },
            ],
          },
          {
            id: ROUTE_ID.PRIVATE_ROUTE,
            element: <PrivateRoute />,
            errorElement: <RouteErrorPage />,
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
