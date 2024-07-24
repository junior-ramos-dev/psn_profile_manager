import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppThemeProvider } from "./theme/AppThemeProvider";

import { App } from "./App";
import { Layout } from "./layouts";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { RoutesChildren } from "./components/Navigation/Routes";

import { Provider } from "react-redux";
import store from "./store";

import reportWebVitals from "../reportWebVitals";

import { GameDetail } from "./pages/Game";
import { loader as gameLoader } from "./pages/Game/GameDetail";

//TODO CHeck if needs persist to DB
import { routes as appRoutes } from "./config/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout routes={appRoutes} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/*",
        element: <RoutesChildren />,
      },
      {
        path: "games/:npCommunicationId",
        element: <GameDetail />,
        loader: gameLoader,
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
        {/* Wrap Theme provider with MUI Styled engine */}
        <StyledEngineProvider injectFirst>
          {/* Wrap your app with the Theme Provider */}
          <AppThemeProvider>
            {/* <App /> */}
            <RouterProvider router={router} />
          </AppThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
