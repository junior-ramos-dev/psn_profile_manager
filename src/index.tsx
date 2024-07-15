import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "../reportWebVitals";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppThemeProvider } from "./theme/AppThemeProvider";

import App from "./App";

import { APP_TITLE, APP_DESCRIPTION } from "./utils/constants";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>{APP_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <Provider store={store}>
        {/* 4. Wrap Theme provider with MUI Styled engine */}
        <StyledEngineProvider injectFirst>
          {/* 5. Wrap your app with the Theme Provider */}
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
