import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { AppLayout } from "@/components/Layout/App";
import { RoutesChildren } from "@/components/Layout/App/Routes";
import { ErrorPage } from "@/pages/Error/ErrorPage";
import { GamesLoader } from "@/services/routesLoaders/games/gamesLoaders";
import { appRoutes } from "@/settings/app";
import { persistor, store } from "@/store";
import { StyledEngineProvider } from "@mui/material/styles";

import reportWebVitals from "../reportWebVitals";

import { AppThemeProvider } from "./theme/AppThemeProvider";

const gamesLoader = new GamesLoader(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout routes={appRoutes} />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/*",
            element: <RoutesChildren />,
            loader: gamesLoader.initGamesListLoader,
            // loader: async () => {
            //   const p = store.dispatch(
            //     gamesApi.endpoints.getGameList({request: "/6690ec7a1b9af84a84b0b425"})
            //   );

            //   const response = await p.unwrap();
            //   console.log(response.gamesList[0]);

            // },
          },
          // {
          //   path: "games/:npCommunicationId",
          //   element: <GameDetail />,
          //   loader: gamesLoader.detailLoader,
          // },
        ],
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; 
                  connect-src 'self' http://127.0.0.1:8001 http://localhost:8001 http://localhost:3000 https://image.api.playstation.com https://images.unsplash.com;
                  style-src 'self' https://fonts.googleapis.com https://unpkg.com https://localhost:8001 'unsafe-inline';
                  script-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline' 'unsafe-eval';
                  font-src 'self' data: https://fonts.gstatic.com https://unpkg.com;
                  img-src 'self' https://image.api.playstation.com;"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
      </Helmet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Wrap Theme provider with MUI Styled engine */}
          <StyledEngineProvider injectFirst>
            {/* Wrap your app with the Theme Provider */}
            <AppThemeProvider>
              <RouterProvider router={router} />
            </AppThemeProvider>
          </StyledEngineProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

reportWebVitals();
