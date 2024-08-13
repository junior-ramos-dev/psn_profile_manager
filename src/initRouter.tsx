import _ from "lodash";
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/Layout/App";
import { PrivateRoute, PublicRoute } from "@/components/Layout/App/Routes";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { IndexPage } from "@/pages/IndexPage";
import { Login, Register } from "@/pages/SignUp";

export const getRouter = (sidebarRoutes, gamesRoutes) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <IndexPage /> },

            {
              element: <PublicRoute />,
              children: [
                {
                  path: "/auth/login",
                  element: <Login />,
                },
                {
                  path: "/auth/register",
                  element: <Register />,
                },
              ],
            },
            {
              element: <PrivateRoute />,
              children: _.concat(sidebarRoutes, gamesRoutes),
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
  ]);
};
