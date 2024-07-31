import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppThemeProvider } from "./theme/AppThemeProvider";
import reportWebVitals from "../reportWebVitals";

import { ErrorPage } from "@/pages/Error/ErrorPage";
import { RoutesChildren } from "@/components/Navigation/Routes";
import { AppLayout } from "@/components/Layout/App/AppLayout";
import { persistor, store } from "@/store";
import { GamesLoader } from "@/services/rtkQueryApi/games/gamesLoaders";
//TODO Check if needs persist appRoutes to DB
import { appRoutes } from "@/data/routes";

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
            loader: async () => await gamesLoader.listLoader({ request: "" }),
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
  <React.StrictMode>
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
  </React.StrictMode>
);

reportWebVitals();
